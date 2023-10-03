/*
*  Client-side Javascript
*/

// register/login/password reset
if (document.querySelector('#register-button') || document.querySelector('#sign-in-button') || document.querySelector('#reset-pwd-btn')) {
  document.querySelector('#register-button').addEventListener('click', function () {
    document.querySelector('#register-modal').style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
  });
  document.querySelector('#sign-in-button').addEventListener('click', function () {
    document.querySelector('#sign-in-modal').style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
  });

  // manage modal close (times) btn events
  const closeRegButton = document.querySelector('#reg-close');
  const closeSignInButton = document.querySelector('#close-log-in');
  const reqPwdResetEmail = document.querySelector('#close-reset-form');

  const modalReg = document.querySelector('#register-modal');
  const modalSignIn = document.querySelector('#sign-in-modal');
  const modelPwdResetEmailForm = document.querySelector('#password-reset-form')

  
  closeRegButton.addEventListener('click', function () {
    modalReg.style.display = "none";
  });
  closeSignInButton.addEventListener('click', function () {
    modalSignIn.style.display = "none";
  });
  reqPwdResetEmail.addEventListener('click', function () {
    modelPwdResetEmailForm.style.display = "none";
  });

  // add esc to close modals  
  document.addEventListener('keyup', (event) => {
    if (event.key === "Escape") {
      if(modalReg.style.display) {
        modalReg.style.display = "none";
      }
      if(modalSignIn) {
        modalSignIn.style.display = "none";
      }
      if(modelPwdResetEmailForm)
        modelPwdResetEmailForm.style.display = "none";
    }
  });

  //section break

  let header = document.querySelector('#header');
  header.style.display = "None";

  let footer = document.querySelector('#footer');
  // footer.style.display = "None";
}

if (document.querySelector("#item-summary")) {
  const okBtn = document.querySelector('#confirm-ok-btn');
  okBtn.addEventListener('click', () => {
    window.location.href = "/";
  });
};

if (document.querySelector("#search-results-list" || document.querySelector('.modal-for-cateogor-edits') )) {
  const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
  viewDetailsButtons.forEach(button => {
    button.addEventListener('click', event => {
      const itemDetails = event.target.nextElementSibling;
      itemDetails.style.display = itemDetails.style.display === 'none' ? 'block' : 'none';
    });
  });
}

const editButton = document.querySelector('#edit-object');
const displayList = document.querySelector('.display-list');
const editForm = document.querySelector('.edit-form');
const cancelButton = document.querySelector('#cancel-object');
if(editButton || cancelButton) {
editButton.addEventListener('click', () => {
  console.log('edit button clicked')
  displayList.style.display = 'none';
  editForm.style.display = 'block';
  editButton.style.display = 'none';
  cancelButton.style.display = 'block';
});
// how to disgard changes and go back to display list
cancelButton.addEventListener('click', () => {
  displayList.style.display = 'block';
  editForm.style.display = 'none';
  editButton.style.display = 'block';
  cancelButton.style.display = 'none';
});
}