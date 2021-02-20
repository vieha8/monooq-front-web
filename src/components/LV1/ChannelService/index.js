class ChannelService {
  constructor() {
    this.loadScript();
  }

  loadScript() {
    const w = global.window && window;
    if (!w) return;
    if (w && w.ChannelIO) {
      return (window.console.error || window.console.log || function () {})(
        'ChannelIO script included twice.',
      );
    }
    const ch = function () {
      ch.c(arguments);
    };
    ch.q = [];
    ch.c = function (args) {
      ch.q.push(args);
    };
    w.ChannelIO = ch;
    function l() {
      if (w.ChannelIOInitialized) {
        return;
      }
      w.ChannelIOInitialized = true;
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
      s.charset = 'UTF-8';
      const x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    }
    if (document.readyState === 'complete') {
      l();
    } else if (window.attachEvent) {
      window.attachEvent('onload', l);
    } else {
      window.addEventListener('DOMContentLoaded', l, false);
      window.addEventListener('load', l, false);
    }
  }

  boot(settings) {
    console.log('channel boot');
    global.window && global.window.ChannelIO && window.ChannelIO('boot', settings);
  }

  shutdown() {
    global.window && window.ChannelIO && window.ChannelIO('shutdown');
  }
}

export default new ChannelService();
