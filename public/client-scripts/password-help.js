// password reset help scripts
const reqPwdResetBtn = document.querySelector('#reset-pwd-btn');
if(reqPwdResetBtn) {
  reqPwdResetBtn.addEventListener('click', (e) => {
    console.log(e.target)
      document.querySelector('#password-reset-form').style.display = 'block';
      document.querySelector('body').style.overflow = 'hidden';
  })
}
