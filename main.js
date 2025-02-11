const btnUserClick = document.getElementById('add');
    const RemoveItem = document.getElementById('remove');
    const groceryQuantity = document.getElementById('quantity');
    const groceryInput = document.querySelector('input');
    const newGroceryItem = document.querySelector('#newGroceryItem');
    let listArr = [];



    btnUserClick.addEventListener('click', () => {
        const groceryInputValue = groceryInput.value;
        const quantity = groceryQuantity.value;
        
        if (groceryInputValue.length <= 1 || quantity < 1) {
            // groceryInputList.innerHTML = ""
            console.log("fields not entered");
            alert("enter all fields");
            return;
        }
            // groceryInputList.innerHTML += `<li>${groceryInputValue + '\n' + quantity}</li>`;
            document.querySelector('#newGroceryItem').innerHTML += `<div class="newItem"><span>${groceryInputValue + ' (' + quantity + ')'}</span><button class="delete">X</button>`

            listArr.push(groceryInputValue);
           console.log(listArr)
            var thisListItem = document.querySelectorAll('.delete');

            for (var i = 0; i < thisListItem.length; i++){
                thisListItem[i].onclick = function(){
                    this.parentNode.remove();
                    listArr.splice(listArr.indexOf(groceryInputValue), 1);
                    console.log(listArr)
                    console.log(listArr.indexOf(groceryInputValue))
                }
            }
    })


    RemoveItem.addEventListener('click', () => {
        if (newGroceryItem.innerHTML.length > 0) {
            newGroceryItem.innerHTML = '';
        }
        
    })

