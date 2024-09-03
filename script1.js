function updateBatteryIndicator(battery)
{
    const batteryIndicator = document.getElementById('battery-indicator');

    const batteryPercentage = document.getElementById('battery-percentage');

    //Shows battery in %
    const batteryLevel = battery.level * 100;


    //screens ko lagi
    if(window.innerWidth > 375){
        batteryIndicator.style.setProperty('--battery-width',`${batteryLevel}%`);
        batteryIndicator.classList.add("horizontal");
        batteryIndicator.classList.remove('vertical');
    }else{
        batteryIndicator.style.setProperty('--battery-height',`${batteryLevel}%`)
        batteryIndicator.classList.add('vertical');
        batteryIndicator.classList.remove('horizontal');
    }

    batteryPercentage.textContent = `${Math.round(batteryLevel)}%`
}

async function initializeBatteryStatus(){
    try {
      const  battery =await navigator.getBattery();
      updateBatteryIndicator(battery);

      battery.addEventListener('levelchange',()=>updateBatteryIndicator(battery));

      battery.addEventListener('chargingchange',()=>updateBatteryIndicator(battery))
    } catch (error) {
        console.error("Failed to get battery status",error)        
    }
}

//Battery status

document.addEventListener('DOMContentLoaded',initializeBatteryStatus);

//resize

window.addEventListener('resize',()=>{
    const batteryIndicator = document.getElementById('battery-indicator');
    if (window.innerWidth <= 375) {
        batteryIndicator.classList.add('vertical');
        batteryIndicator.classList.remove('horizontal');
    } else {
        batteryIndicator.classList.add('horizontal');
        batteryIndicator.classList.remove('vertical');
    }
});