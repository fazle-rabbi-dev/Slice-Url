git add .

# Get the current date in the desired format
current_datetime=$(date "+%Y-%m-%d %I:%M:%S %p")

# Construct the commit message with the current date
commit_message="backup at $current_datetime"

git commit -m "$commit_message"

git push

exit
