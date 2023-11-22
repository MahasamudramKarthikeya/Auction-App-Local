import React, { useState } from 'react';
import axios from "axios";
import { useAlert } from 'react-alert';


import { useHistory } from "react-router-dom";

const PlaceBid = ({product}) => {
    const [ammount , setAmmount] = useState("");


    const alert = useAlert();
    const bidSubmitHandler = (e) => {
        e.preventDefault();

        if(ammount > product.startingBid){
           console.log(`ammount is valid`);
        

        const myForm = new FormData();

        myForm.set("productId" , product._id);
        myForm.set("bidAmmount" , ammount);
          
console.log(myForm);
        axios({
            method: "post",
            url: "/products/bid",
            data: myForm,
            headers: { "Content-Type":"application/json"},
          })
            .then(function (response) {
              //handle success
              console.log(response);
              if(response.status === 201){
                //   alert("Bid Placed SuccessFully");
                e.preventDefault();

                setAmmount("");
                  alert.success("Bid Placed Successfully");
              }
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });

          }else{
            console.log(`ammount is invalid`);
        //   history.push("/lot");
        alert.error(`Bid must be greater than initial `);
        }


      };


  return (
    <>

{/* onSubmit={searchSubmitHandler} */}
{/* <h1>place Bid called</h1> */}
<form className='searchBox' onSubmit={bidSubmitHandler}>
<div className='placeBid'>
						<div className="product_count">
							<label for="qty">Bid Ammount:</label>
							<input 
                            type="number" 
                            name="qty" 
                            id="sst" 
                            maxlength="12" 
                            title="Quantity:" 
                            className="input-text qty"
                            onChange={(e) => setAmmount(e.target.value)}
                            required
                            />
							
						</div>
						<div className="card_area d-flex">
							<button className="primary-btn" type='submit' >Place Bid</button>
                          
						</div>
            </div>
            </form>

    </>
  )
}

export default PlaceBid