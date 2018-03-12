const toBytes = s => Array.from(s).map(c => c.charCodeAt(0));
const xpiZipFilename = toBytes('META-INF/mozilla.rsa');
const oxmlContentTypes = toBytes('[Content_Types].xml');
const oxmlRels = toBytes('_rels/.rels');

export default input => {
  const buf = input instanceof Uint8Array ? input : new Uint8Array(input);

  if (!(buf && buf.length > 1)) {
    return null;
  }

  const check = (header, options) => {
    options = Object.assign(
      {
        offset: 0,
      },
      options,
    );

    for (let i = 0; i < header.length; i++) {
      // If a bitmask is set
      if (options.mask) {
        // If header doesn't equal `buf` with bits masked off
        if (header[i] !== (options.mask[i] & buf[i + options.offset])) {
          return false;
        }
      } else if (header[i] !== buf[i + options.offset]) {
        return false;
      }
    }

    return true;
  };

  const checkString = (header, options) => check(toBytes(header), options);

  if (check([0xff, 0xd8, 0xff])) {
    return {
      ext: 'jpg',
      mime: 'image/jpeg',
    };
  }

  if (check([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
    return {
      ext: 'png',
      mime: 'image/png',
    };
  }

  if (check([0x47, 0x49, 0x46])) {
    return {
      ext: 'gif',
      mime: 'image/gif',
    };
  }

  if (check([0x57, 0x45, 0x42, 0x50], { offset: 8 })) {
    return {
      ext: 'webp',
      mime: 'image/webp',
    };
  }

  if (check([0x46, 0x4c, 0x49, 0x46])) {
    return {
      ext: 'flif',
      mime: 'image/flif',
    };
  }

  // Needs to be before `tif` check
  if (
    (check([0x49, 0x49, 0x2a, 0x0]) || check([0x4d, 0x4d, 0x0, 0x2a])) &&
    check([0x43, 0x52], { offset: 8 })
  ) {
    return {
      ext: 'cr2',
      mime: 'image/x-canon-cr2',
    };
  }

  if (check([0x49, 0x49, 0x2a, 0x0]) || check([0x4d, 0x4d, 0x0, 0x2a])) {
    return {
      ext: 'tif',
      mime: 'image/tiff',
    };
  }

  if (check([0x42, 0x4d])) {
    return {
      ext: 'bmp',
      mime: 'image/bmp',
    };
  }

  if (check([0x49, 0x49, 0xbc])) {
    return {
      ext: 'jxr',
      mime: 'image/vnd.ms-photo',
    };
  }

  if (check([0x38, 0x42, 0x50, 0x53])) {
    return {
      ext: 'psd',
      mime: 'image/vnd.adobe.photoshop',
    };
  }

  // Zip-based file formats
  // Need to be before the `zip` check
  if (check([0x50, 0x4b, 0x3, 0x4])) {
    if (
      check(
        [
          0x6d,
          0x69,
          0x6d,
          0x65,
          0x74,
          0x79,
          0x70,
          0x65,
          0x61,
          0x70,
          0x70,
          0x6c,
          0x69,
          0x63,
          0x61,
          0x74,
          0x69,
          0x6f,
          0x6e,
          0x2f,
          0x65,
          0x70,
          0x75,
          0x62,
          0x2b,
          0x7a,
          0x69,
          0x70,
        ],
        { offset: 30 },
      )
    ) {
      return {
        ext: 'epub',
        mime: 'application/epub+zip',
      };
    }

    // Assumes signed `.xpi` from addons.mozilla.org
    if (check(xpiZipFilename, { offset: 30 })) {
      return {
        ext: 'xpi',
        mime: 'application/x-xpinstall',
      };
    }

    if (checkString('mimetypeapplication/vnd.oasis.opendocument.text', { offset: 30 })) {
      return {
        ext: 'odt',
        mime: 'application/vnd.oasis.opendocument.text',
      };
    }

    if (checkString('mimetypeapplication/vnd.oasis.opendocument.spreadsheet', { offset: 30 })) {
      return {
        ext: 'ods',
        mime: 'application/vnd.oasis.opendocument.spreadsheet',
      };
    }

    if (checkString('mimetypeapplication/vnd.oasis.opendocument.presentation', { offset: 30 })) {
      return {
        ext: 'odp',
        mime: 'application/vnd.oasis.opendocument.presentation',
      };
    }

    // https://github.com/file/file/blob/master/magic/Magdir/msooxml
    if (check(oxmlContentTypes, { offset: 30 }) || check(oxmlRels, { offset: 30 })) {
      const sliced = buf.subarray(4, 4 + 2000);
      const nextZipHeaderIndex = arr =>
        arr.findIndex(
          (el, i, arr) =>
            arr[i] === 0x50 && arr[i + 1] === 0x4b && arr[i + 2] === 0x3 && arr[i + 3] === 0x4,
        );
      const header2Pos = nextZipHeaderIndex(sliced);

      if (header2Pos !== -1) {
        const slicedAgain = buf.subarray(header2Pos + 8, header2Pos + 8 + 1000);
        const header3Pos = nextZipHeaderIndex(slicedAgain);

        if (header3Pos !== -1) {
          const offset = 8 + header2Pos + header3Pos + 30;

          if (checkString('word/', { offset })) {
            return {
              ext: 'docx',
              mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            };
          }

          if (checkString('ppt/', { offset })) {
            return {
              ext: 'pptx',
              mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            };
          }

          if (checkString('xl/', { offset })) {
            return {
              ext: 'xlsx',
              mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            };
          }
        }
      }
    }
  }

  if (
    check([0x50, 0x4b]) &&
    (buf[2] === 0x3 || buf[2] === 0x5 || buf[2] === 0x7) &&
    (buf[3] === 0x4 || buf[3] === 0x6 || buf[3] === 0x8)
  ) {
    return {
      ext: 'zip',
      mime: 'application/zip',
    };
  }

  if (check([0x75, 0x73, 0x74, 0x61, 0x72], { offset: 257 })) {
    return {
      ext: 'tar',
      mime: 'application/x-tar',
    };
  }

  if (check([0x52, 0x61, 0x72, 0x21, 0x1a, 0x7]) && (buf[6] === 0x0 || buf[6] === 0x1)) {
    return {
      ext: 'rar',
      mime: 'application/x-rar-compressed',
    };
  }

  if (check([0x1f, 0x8b, 0x8])) {
    return {
      ext: 'gz',
      mime: 'application/gzip',
    };
  }

  if (check([0x42, 0x5a, 0x68])) {
    return {
      ext: 'bz2',
      mime: 'application/x-bzip2',
    };
  }

  if (check([0x37, 0x7a, 0xbc, 0xaf, 0x27, 0x1c])) {
    return {
      ext: '7z',
      mime: 'application/x-7z-compressed',
    };
  }

  if (check([0x78, 0x01])) {
    return {
      ext: 'dmg',
      mime: 'application/x-apple-diskimage',
    };
  }

  if (
    check([0x33, 0x67, 0x70, 0x35]) || // 3gp5
    (check([0x0, 0x0, 0x0]) &&
      check([0x66, 0x74, 0x79, 0x70], { offset: 4 }) &&
      (check([0x6d, 0x70, 0x34, 0x31], { offset: 8 }) || // MP41
      check([0x6d, 0x70, 0x34, 0x32], { offset: 8 }) || // MP42
      check([0x69, 0x73, 0x6f, 0x6d], { offset: 8 }) || // ISOM
      check([0x69, 0x73, 0x6f, 0x32], { offset: 8 }) || // ISO2
      check([0x6d, 0x6d, 0x70, 0x34], { offset: 8 }) || // MMP4
      check([0x4d, 0x34, 0x56], { offset: 8 }) || // M4V
        check([0x64, 0x61, 0x73, 0x68], { offset: 8 }))) // DASH
  ) {
    return {
      ext: 'mp4',
      mime: 'video/mp4',
    };
  }

  if (check([0x4d, 0x54, 0x68, 0x64])) {
    return {
      ext: 'mid',
      mime: 'audio/midi',
    };
  }

  // https://github.com/threatstack/libmagic/blob/master/magic/Magdir/matroska
  if (check([0x1a, 0x45, 0xdf, 0xa3])) {
    const sliced = buf.subarray(4, 4 + 4096);
    const idPos = sliced.findIndex((el, i, arr) => arr[i] === 0x42 && arr[i + 1] === 0x82);

    if (idPos !== -1) {
      const docTypePos = idPos + 3;
      const findDocType = type =>
        Array.from(type).every((c, i) => sliced[docTypePos + i] === c.charCodeAt(0));

      if (findDocType('matroska')) {
        return {
          ext: 'mkv',
          mime: 'video/x-matroska',
        };
      }

      if (findDocType('webm')) {
        return {
          ext: 'webm',
          mime: 'video/webm',
        };
      }
    }
  }

  if (
    check([0x0, 0x0, 0x0, 0x14, 0x66, 0x74, 0x79, 0x70, 0x71, 0x74, 0x20, 0x20]) ||
    check([0x66, 0x72, 0x65, 0x65], { offset: 4 }) ||
    check([0x66, 0x74, 0x79, 0x70, 0x71, 0x74, 0x20, 0x20], { offset: 4 }) ||
    check([0x6d, 0x64, 0x61, 0x74], { offset: 4 }) || // MJPEG
    check([0x77, 0x69, 0x64, 0x65], { offset: 4 })
  ) {
    return {
      ext: 'mov',
      mime: 'video/quicktime',
    };
  }

  if (check([0x52, 0x49, 0x46, 0x46]) && check([0x41, 0x56, 0x49], { offset: 8 })) {
    return {
      ext: 'avi',
      mime: 'video/x-msvideo',
    };
  }

  if (check([0x30, 0x26, 0xb2, 0x75, 0x8e, 0x66, 0xcf, 0x11, 0xa6, 0xd9])) {
    return {
      ext: 'wmv',
      mime: 'video/x-ms-wmv',
    };
  }

  if (check([0x0, 0x0, 0x1, 0xba]) || check([0x0, 0x0, 0x1, 0xb3])) {
    return {
      ext: 'mpg',
      mime: 'video/mpeg',
    };
  }

  if (check([0x66, 0x74, 0x79, 0x70, 0x33, 0x67], { offset: 4 })) {
    return {
      ext: '3gp',
      mime: 'video/3gpp',
    };
  }

  // Check for MPEG header at different starting offsets
  for (let start = 0; start < 2 && start < buf.length - 16; start++) {
    if (
      check([0x49, 0x44, 0x33], { offset: start }) || // ID3 header
      check([0xff, 0xe2], { offset: start, mask: [0xff, 0xe2] }) // MPEG 1 or 2 Layer 3 header
    ) {
      return {
        ext: 'mp3',
        mime: 'audio/mpeg',
      };
    }

    if (
      check([0xff, 0xe4], { offset: start, mask: [0xff, 0xe4] }) // MPEG 1 or 2 Layer 2 header
    ) {
      return {
        ext: 'mp2',
        mime: 'audio/mpeg',
      };
    }
  }

  if (
    check([0x66, 0x74, 0x79, 0x70, 0x4d, 0x34, 0x41], { offset: 4 }) ||
    check([0x4d, 0x34, 0x41, 0x20])
  ) {
    return {
      ext: 'm4a',
      mime: 'audio/m4a',
    };
  }

  // Needs to be before `ogg` check
  if (check([0x4f, 0x70, 0x75, 0x73, 0x48, 0x65, 0x61, 0x64], { offset: 28 })) {
    return {
      ext: 'opus',
      mime: 'audio/opus',
    };
  }

  // If 'OggS' in first  bytes, then OGG container
  if (check([0x4f, 0x67, 0x67, 0x53])) {
    // This is a OGG container

    // If ' theora' in header.
    if (check([0x80, 0x74, 0x68, 0x65, 0x6f, 0x72, 0x61], { offset: 28 })) {
      return {
        ext: 'ogv',
        mime: 'video/ogg',
      };
    }
    // If '\x01video' in header.
    if (check([0x01, 0x76, 0x69, 0x64, 0x65, 0x6f, 0x00], { offset: 28 })) {
      return {
        ext: 'ogm',
        mime: 'video/ogg',
      };
    }
    // If ' FLAC' in header  https://xiph.org/flac/faq.html
    if (check([0x7f, 0x46, 0x4c, 0x41, 0x43], { offset: 28 })) {
      return {
        ext: 'oga',
        mime: 'audio/ogg',
      };
    }

    // 'Speex  ' in header https://en.wikipedia.org/wiki/Speex
    if (check([0x53, 0x70, 0x65, 0x65, 0x78, 0x20, 0x20], { offset: 28 })) {
      return {
        ext: 'spx',
        mime: 'audio/ogg',
      };
    }

    // If '\x01vorbis' in header
    if (check([0x01, 0x76, 0x6f, 0x72, 0x62, 0x69, 0x73], { offset: 28 })) {
      return {
        ext: 'ogg',
        mime: 'audio/ogg',
      };
    }

    // Default OGG container https://www.iana.org/assignments/media-types/application/ogg
    return {
      ext: 'ogx',
      mime: 'application/ogg',
    };
  }

  if (check([0x66, 0x4c, 0x61, 0x43])) {
    return {
      ext: 'flac',
      mime: 'audio/x-flac',
    };
  }

  if (check([0x52, 0x49, 0x46, 0x46]) && check([0x57, 0x41, 0x56, 0x45], { offset: 8 })) {
    return {
      ext: 'wav',
      mime: 'audio/x-wav',
    };
  }

  if (check([0x23, 0x21, 0x41, 0x4d, 0x52, 0x0a])) {
    return {
      ext: 'amr',
      mime: 'audio/amr',
    };
  }

  if (check([0x25, 0x50, 0x44, 0x46])) {
    return {
      ext: 'pdf',
      mime: 'application/pdf',
    };
  }

  if (check([0x4d, 0x5a])) {
    return {
      ext: 'exe',
      mime: 'application/x-msdownload',
    };
  }

  if ((buf[0] === 0x43 || buf[0] === 0x46) && check([0x57, 0x53], { offset: 1 })) {
    return {
      ext: 'swf',
      mime: 'application/x-shockwave-flash',
    };
  }

  if (check([0x7b, 0x5c, 0x72, 0x74, 0x66])) {
    return {
      ext: 'rtf',
      mime: 'application/rtf',
    };
  }

  if (check([0x00, 0x61, 0x73, 0x6d])) {
    return {
      ext: 'wasm',
      mime: 'application/wasm',
    };
  }

  if (
    check([0x77, 0x4f, 0x46, 0x46]) &&
    (check([0x00, 0x01, 0x00, 0x00], { offset: 4 }) ||
      check([0x4f, 0x54, 0x54, 0x4f], { offset: 4 }))
  ) {
    return {
      ext: 'woff',
      mime: 'font/woff',
    };
  }

  if (
    check([0x77, 0x4f, 0x46, 0x32]) &&
    (check([0x00, 0x01, 0x00, 0x00], { offset: 4 }) ||
      check([0x4f, 0x54, 0x54, 0x4f], { offset: 4 }))
  ) {
    return {
      ext: 'woff2',
      mime: 'font/woff2',
    };
  }

  if (
    check([0x4c, 0x50], { offset: 34 }) &&
    (check([0x00, 0x00, 0x01], { offset: 8 }) ||
      check([0x01, 0x00, 0x02], { offset: 8 }) ||
      check([0x02, 0x00, 0x02], { offset: 8 }))
  ) {
    return {
      ext: 'eot',
      mime: 'application/octet-stream',
    };
  }

  if (check([0x00, 0x01, 0x00, 0x00, 0x00])) {
    return {
      ext: 'ttf',
      mime: 'font/ttf',
    };
  }

  if (check([0x4f, 0x54, 0x54, 0x4f, 0x00])) {
    return {
      ext: 'otf',
      mime: 'font/otf',
    };
  }

  if (check([0x00, 0x00, 0x01, 0x00])) {
    return {
      ext: 'ico',
      mime: 'image/x-icon',
    };
  }

  if (check([0x46, 0x4c, 0x56, 0x01])) {
    return {
      ext: 'flv',
      mime: 'video/x-flv',
    };
  }

  if (check([0x25, 0x21])) {
    return {
      ext: 'ps',
      mime: 'application/postscript',
    };
  }

  if (check([0xfd, 0x37, 0x7a, 0x58, 0x5a, 0x00])) {
    return {
      ext: 'xz',
      mime: 'application/x-xz',
    };
  }

  if (check([0x53, 0x51, 0x4c, 0x69])) {
    return {
      ext: 'sqlite',
      mime: 'application/x-sqlite3',
    };
  }

  if (check([0x4e, 0x45, 0x53, 0x1a])) {
    return {
      ext: 'nes',
      mime: 'application/x-nintendo-nes-rom',
    };
  }

  if (check([0x43, 0x72, 0x32, 0x34])) {
    return {
      ext: 'crx',
      mime: 'application/x-google-chrome-extension',
    };
  }

  if (check([0x4d, 0x53, 0x43, 0x46]) || check([0x49, 0x53, 0x63, 0x28])) {
    return {
      ext: 'cab',
      mime: 'application/vnd.ms-cab-compressed',
    };
  }

  // Needs to be before `ar` check
  if (
    check([
      0x21,
      0x3c,
      0x61,
      0x72,
      0x63,
      0x68,
      0x3e,
      0x0a,
      0x64,
      0x65,
      0x62,
      0x69,
      0x61,
      0x6e,
      0x2d,
      0x62,
      0x69,
      0x6e,
      0x61,
      0x72,
      0x79,
    ])
  ) {
    return {
      ext: 'deb',
      mime: 'application/x-deb',
    };
  }

  if (check([0x21, 0x3c, 0x61, 0x72, 0x63, 0x68, 0x3e])) {
    return {
      ext: 'ar',
      mime: 'application/x-unix-archive',
    };
  }

  if (check([0xed, 0xab, 0xee, 0xdb])) {
    return {
      ext: 'rpm',
      mime: 'application/x-rpm',
    };
  }

  if (check([0x1f, 0xa0]) || check([0x1f, 0x9d])) {
    return {
      ext: 'Z',
      mime: 'application/x-compress',
    };
  }

  if (check([0x4c, 0x5a, 0x49, 0x50])) {
    return {
      ext: 'lz',
      mime: 'application/x-lzip',
    };
  }

  if (check([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])) {
    return {
      ext: 'msi',
      mime: 'application/x-msi',
    };
  }

  if (check([0x06, 0x0e, 0x2b, 0x34, 0x02, 0x05, 0x01, 0x01, 0x0d, 0x01, 0x02, 0x01, 0x01, 0x02])) {
    return {
      ext: 'mxf',
      mime: 'application/mxf',
    };
  }

  if (
    check([0x47], { offset: 4 }) &&
    (check([0x47], { offset: 192 }) || check([0x47], { offset: 196 }))
  ) {
    return {
      ext: 'mts',
      mime: 'video/mp2t',
    };
  }

  if (check([0x42, 0x4c, 0x45, 0x4e, 0x44, 0x45, 0x52])) {
    return {
      ext: 'blend',
      mime: 'application/x-blender',
    };
  }

  if (check([0x42, 0x50, 0x47, 0xfb])) {
    return {
      ext: 'bpg',
      mime: 'image/bpg',
    };
  }

  if (check([0x00, 0x00, 0x00, 0x0c, 0x6a, 0x50, 0x20, 0x20, 0x0d, 0x0a, 0x87, 0x0a])) {
    // JPEG-2000 family

    if (check([0x6a, 0x70, 0x32, 0x20], { offset: 20 })) {
      return {
        ext: 'jp2',
        mime: 'image/jp2',
      };
    }

    if (check([0x6a, 0x70, 0x78, 0x20], { offset: 20 })) {
      return {
        ext: 'jpx',
        mime: 'image/jpx',
      };
    }

    if (check([0x6a, 0x70, 0x6d, 0x20], { offset: 20 })) {
      return {
        ext: 'jpm',
        mime: 'image/jpm',
      };
    }

    if (check([0x6d, 0x6a, 0x70, 0x32], { offset: 20 })) {
      return {
        ext: 'mj2',
        mime: 'image/mj2',
      };
    }
  }

  if (check([0x46, 0x4f, 0x52, 0x4d, 0x00])) {
    return {
      ext: 'aif',
      mime: 'audio/aiff',
    };
  }

  if (checkString('<?xml ')) {
    return {
      ext: 'xml',
      mime: 'application/xml',
    };
  }

  if (check([0x42, 0x4f, 0x4f, 0x4b, 0x4d, 0x4f, 0x42, 0x49], { offset: 60 })) {
    return {
      ext: 'mobi',
      mime: 'application/x-mobipocket-ebook',
    };
  }

  // File Type Box (https://en.wikipedia.org/wiki/ISO_base_media_file_format)
  if (check([0x66, 0x74, 0x79, 0x70], { offset: 4 })) {
    if (check([0x6d, 0x69, 0x66, 0x31], { offset: 8 })) {
      return {
        ext: 'heic',
        mime: 'image/heif',
      };
    }

    if (check([0x6d, 0x73, 0x66, 0x31], { offset: 8 })) {
      return {
        ext: 'heic',
        mime: 'image/heif-sequence',
      };
    }

    if (
      check([0x68, 0x65, 0x69, 0x63], { offset: 8 }) ||
      check([0x68, 0x65, 0x69, 0x78], { offset: 8 })
    ) {
      return {
        ext: 'heic',
        mime: 'image/heic',
      };
    }

    if (
      check([0x68, 0x65, 0x76, 0x63], { offset: 8 }) ||
      check([0x68, 0x65, 0x76, 0x78], { offset: 8 })
    ) {
      return {
        ext: 'heic',
        mime: 'image/heic-sequence',
      };
    }
  }

  return null;
};
