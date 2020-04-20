function main() {
  // CHANGE THESE
  const emailFrom = "mygroupname+msgappr@googlegroups.com";   // email address from which 'message pending' message is received
  const codeWord = "SelfCheckTest";   // word that is in the message sent from test email sender
  const labelName = "Checked";    // label to create for tested emails
  const recipient = 'recipient@example.com'; // email to send the test result to 
  
  if (!GmailApp.getUserLabelByName(labelName)) GmailApp.createLabel(labelName);
  const label = GmailApp.getUserLabelByName(labelName);
  var threads = GmailApp.search("newer_than:1d from:" + emailFrom + " +" + codeWord,0,10);     // find specific mail received in the last 24 hours
  // result of the test depending on if pending message is found
  if(threads.length) {
    label.addToThreads(threads);
    const status = 'SUCCESS - ';
    const body = 'Self check test successful';
    sendMail(recipient,status,body);
  } 
  else {
    const status = 'FAIL - ';
    const body = 'Self check test failed. Check group mail settings.';
    sendMail(recipient,status,body);
  }
  deleteOldTest(labelName);
}

// send mail with results
function sendMail(recipient,status,body){
   var today = new Date();
   today = Utilities.formatDate(today, 'Etc/GMT', 'yyyy/MM/dd');
   const subjEnd = 'Self check google groups ' + today;  //last part of subject always the same
   GmailApp.sendEmail(recipient, status + subjEnd, body);
}

// deleting previous test mails
function deleteOldTest(labelName){
  const threadsToDel = GmailApp.search('older_than:1d label:' + labelName,0,10);
  GmailApp.moveThreadsToTrash(threadsToDel);
}