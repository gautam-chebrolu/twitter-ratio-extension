let userinput = select("#userinput");
userinput.input(changeText);

function changeText() {
  let params = {
    active: true,
    currentWindow: true,
  };

  chrome.tabs.query(params, gotTab);

  function gotTab(tab) {
    console.log(tab);
    let message = userinput.value();
    let msg = {
      txt: "hello",
    };
    chrome.tabs.sendMessage(tabs[0].id, msg);
  }
}
