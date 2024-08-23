document.getElementById('node-version').innerHTML = versions.node();
document.getElementById('chromium-version').innerHTML = versions.chrome();
document.getElementById('electron-version').innerHTML = versions.electron();

const btnOneway = document.getElementById('oneway');
btnOneway.addEventListener('click',
 () => electronAPI.superActionOneWay('ping1', 'ping2'));

 const btnTwoway = document.getElementById('twoway');
btnTwoway.addEventListener('click', async () => {
 const retour = await electronAPI.superActionTwoWay('ping');
 console.log(retour);
});

electronAPI.handleAction((event, value) => {
  console.log(value);
  // Si on veut renvoyer une valeur comme en One-way.
  // event.sender.send('channel', param)
 });

