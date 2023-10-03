if (document.querySelector('#pwd-confirm-status')) {
  // validation flags
  let emailNotInUse = false;
  let userNameNotInUse = false;
  let passwordValid = false;
  let reEnterPasswordMatch = false;

  // function to keep submit button disabled until all validation flags are true
  function setSubmitButton() {
    let submissonBtn = document.querySelector("#create-account");
    if (emailNotInUse && userNameNotInUse && passwordValid && reEnterPasswordMatch) {
      submissonBtn.disabled = false;
      submissonBtn.pointerEvents = "auto";
      submissonBtn.cursor = "pointer";
    } else {
      submissonBtn.disabled = true;
      submissonBtn.pointerEvents = "none";
      submissonBtn.cursor = "not-allowed";
    }
  }

  const emailToCheck = document.querySelector('#email');
  const usernameToCheck = document.querySelector('#username');
  const pwdToCheck = document.querySelector('#txtPassword');
  const secondPwdToCheck = document.querySelector('#pwd-confirm');

  document.querySelector('#email').addEventListener('keyup', () => {
    const email = emailToCheck.value;
    if (email != "") {
      fetch('/validation/email_check?email=' + email.toLowerCase())
        .then(response => response.json())
        .then(data => {
          if (data.message == "inuse") {
            emailNotInUse = false;
            document.querySelector('#email-status').innerText = "Email already in use!";
            setSubmitButton();
          } else {
            emailNotInUse = true;
            document.querySelector('#email-status').innerText = "";
            setSubmitButton();
          }
        });
    } else {
      emailNotInUse = false;
      document.querySelector('#email-status');
      setSubmitButton();
    }
  });

  document.querySelector('#username').addEventListener('keyup', () => {
    const nameToCheck = usernameToCheck.value;
    if (username != "") {
      fetch('/validation/username_check?username=' + nameToCheck.toLowerCase())
        .then(response => response.json())
        .then(data => {
          if (data.message == "taken") {
            userNameNotInUse = false;
            document.querySelector('#username-status').innerText = "Username already taken!";
            setSubmitButton();
          } else {
            userNameNotInUse = true;
            document.querySelector('#username-status').innerText = "";
            setSubmitButton();
          }
        });
    } else {
      userNameNotInUse = false;
      document.querySelector('#username-status').innerText = "Username can not be empty!!";
      setSubmitButton();
    }
  });

  document.querySelector('#txtPassword').addEventListener('keyup', () => {
    let password = pwdToCheck.value;
    passwordValid = isValidPassword(password)
    if (passwordValid) {
      document.querySelector('#pwd-status').innerText = "";
      setSubmitButton();
    } else {
      document.querySelector('#pwd-status').innerHTML = "Password must contain at least 8 characters, at least one of which must be uppercase, lowercase and numeric.";
      setSubmitButton();
    }
  });

  document.querySelector('#pwd-confirm').addEventListener('keyup', () => {
    let pwd = pwdToCheck.value;
    let confirmPwd = secondPwdToCheck.value;
    if (pwd != "" && confirmPwd != "" && pwd == confirmPwd) {
      reEnterPasswordMatch = true;
      document.querySelector('#pwd-confirm-status').innerText = '';
      setSubmitButton();
    } else if (confirmPwd == "") {
      reEnterPasswordMatch = false;
      document.querySelector('#pwd-confirm-status').innerText = "password can not be empty!";
      setSubmitButton();
    } else if (confirmPwd != pwd) {
      reEnterPasswordMatch = false;
      document.querySelector('#pwd-confirm-status').innerText = "passwords do not match!";
      setSubmitButton();
    }
  });
} else {
  console.log("not on validation page")
}

function isValidPassword(password) {
  const passwordRegexProd = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const passwordRegexDev = /^.*$/;
  return passwordRegexDev.test(password);
}