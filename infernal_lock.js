var locked = false;
var numberTries = 0;

function verify(passwrd)
{
    x = Math.floor(passwrd / 100);
    y = Math.floor(passwrd / 10) % 10;
    z = passwrd % 10;
    return (
        (passwrd % (y * z) == x + y + z) &&
        (x * y == Math.pow(z, 2)) && 
        (16 < y * z && y * z < 81)
    )
}

function stopAlarm()
{
    locked = false;
    document.getElementById("alarm").pause();
}

function pressDial(number)
{
    if(locked)
        return;
    let display = document.getElementById("display");
    display.value += number;

    document.getElementById("click").play();

    if(display.value.length < 3)
        return;

    passwrd = parseInt(display.value);
    display.value = "";
    if(verify(passwrd))
    {
        document.getElementById("unlock").play();
        numberTries = 0;
        return;
    }

    numberTries += 1;
    if(numberTries < 3)
        return;

    locked = true;
    numberTries = 0;
    document.getElementById("alarm").play();
    setTimeout(stopAlarm, 60000);
}