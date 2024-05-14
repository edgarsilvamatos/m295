async function simuliereVerzoegerung(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function addiereNachVerzoegerung(a, b, ms) {
    await simuliereVerzoegerung(ms);
    console.log(a + b); 
  }
  
  addiereNachVerzoegerung(3, 5, 2000); 