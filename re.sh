if [ $# -eq 0 ]; then
  echo no args.
  exit 1
fi

IMG_DIR=react-ui/src/images/
mv $IMG_DIR/$1 $IMG_DIR/$2
git grep $1
git grep -l $1 | xargs sed -i '' -e "s/$1/$2/g"
