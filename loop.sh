cnt=0
while read line
do
  cnt=`expr $cnt + 1`
  ./re.sh $line
done < mapping
