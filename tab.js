const textTabs = document.querySelectorAll('.text-tab');
const textContents = document.querySelectorAll('.text-tab-content');
const textTabs2 = document.querySelectorAll('.text-tab2');
const textContents2 = document.querySelectorAll('.text-tab-content2');

textTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // 移除所有頁籤的 active 狀態
        textTabs.forEach(t => t.classList.remove('active'));
        textContents.forEach(content => content.classList.remove('active'));

        // 給當前點擊的頁籤和對應內容加上 active
        tab.classList.add('active');
        textContents[index].classList.add('active');
    });
});

textTabs2.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // 移除所有頁籤的 active 狀態
        textTabs2.forEach(t => t.classList.remove('active'));
        textContents2.forEach(content => content.classList.remove('active'));

        // 給當前點擊的頁籤和對應內容加上 active
        tab.classList.add('active');
        textContents2[index].classList.add('active');
    });
});