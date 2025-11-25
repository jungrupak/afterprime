export function getSessionFormId() {

  const formIframeID = "GYkOukSo"
  return formIframeID;
  // const FORM_A = "GYkOukSo"; // session 1 form
  // const FORM_B = "rUGJngpI"; // session 2 form

  // Check if formId already exists in sessionStorage
  //let formId = sessionStorage.getItem("formId");

  // If not assigned yet, randomly pick one (50|50 split)
  // if (!formId) {
  //   formId = Math.random() < 0.5 ? FORM_A : FORM_B;
  //   sessionStorage.setItem("formId", formId);
  // }

  // return formId;
}