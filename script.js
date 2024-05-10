document.addEventListener("DOMContentLoaded", function() {
    const dropdownBtn = document.querySelector(".dropbtn");
    const dropdownContent = document.querySelector(".dropdown-content");

    dropdownBtn.addEventListener("click", function() {
        dropdownContent.classList.toggle("show");
        if (dropdownContent.classList.contains("show")) {
            dropdownContent.style.maxHeight = dropdownContent.scrollHeight + "px";
        } else {
            dropdownContent.style.maxHeight = "0";
        }
    });
});
