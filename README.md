# Google Groups Self Check
Simple Google Apps Script made for daily checking if group's message moderation setting is enabled (and working). Checks if the email message sent to a google group is stopped for moderator approval.
## Usage
- Set a daily task to send a message from some email to the group which moderation settings you want to test.
- Create a project with this script at google group's owner/moderator account.
- Change info in the main function to the one you need.
- Add a trigger for the project to run script daily (some time after the test email from first step is sent).

## License
MIT
