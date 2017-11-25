var x = document.getElementById('back');
if(x)
{
    x.addEventListener('click', function(event){
        console.log("Event fired");
        window.history.back();
    });
}