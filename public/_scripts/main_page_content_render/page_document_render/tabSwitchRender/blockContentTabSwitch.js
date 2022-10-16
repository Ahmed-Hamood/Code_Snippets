export default function blockContentTabSwitch() {
 function tabAction(e, tabIndex) {
  let el = e.target.parentElement.parentElement.lastElementChild.children
  let codeContainerChildren = e.target.parentElement.children

  // if (!e.target.classList.contains('active')) SideBar_Close.play();

  // Remove active class from every Tab-Btn
  for (let index = 0; index < codeContainerChildren.length; index++) {
   codeContainerChildren[index].classList.remove("active")
  }

  for (let index = 0; index < el.length; index++) {
   if (el[index].classList.contains("tab-content")) el[index].classList.add("disableTab")
  }

  e.target.classList.add("active")

  e.target.parentElement.parentElement.lastElementChild.children[tabIndex].classList.remove("disableTab")
 }

 document.querySelectorAll(".main-tab-content").forEach(item => {
  for (let index = 0; index < item.children.length; index++) {
   if (!item.previousElementSibling.children[index].classList.contains("active")) {
    item.children[index].classList.add("disableTab")
   }
   // if (index != 0) item.children[index].classList.add('disableTab');
  }
 })

 document.querySelectorAll(".btn_tabs").forEach(el => {
  for (let index = 0; index < el.children.length; index++) {
   el.children[index].addEventListener("click", e => {
    tabAction(e, index)
   })
  }
 })
}
