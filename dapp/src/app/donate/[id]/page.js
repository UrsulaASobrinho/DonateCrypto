"use client"


import { getCampaign } from "@/app/services/Web3Service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Web3 from "web3";

export default function Donate(){
    const params = useParams();

    const [message, setMessage] = useState("");
    const [campaign, setCampaign] = useState({});
    const [donation, setDonation] = useState(0);

    // funcao teste para mostra os dados da campnha
    //function replacer(key, value) {
    //    if (typeof value === 'bigint') {
    //        return value.toString();
    //     }
    //    return value;
    //}

    useEffect(() => {
        setMessage("Buscando campanha....aguarde...");
        getCampaign(params.id)
            .then(result =>{
                setMessage("");
                result.id = params.id;
                //setMessage(JSON.stringify(result, replacer));  //teste mostra se esta trazendo os dados
                setCampaign(result);
            })
            .catch(err => {
                console.error(err);
                setMessage(err.mensagem);
            })
    }, [])

    function onDonationChange(evt){
        setDonation(evt.target.value);
    }
    function onDonationClick(){
        setMessage("Você doou" + donation);
    }

    return(
        <>
        <div className="container">
           <h1 className="display-5 fw-bold text-doby-emphasis lh-l mb-3 mt-5">Donate Crypto</h1>
          <p className="lead"> Verifique se esta campanha é a correta antes de finalizar a sua doação.</p>
           <hr/>
           <div className="row flex-lg-row-reverse align-items-center g-5">
                <div className="col-7">
                   {
                        campaign.videoUrl
                        ? <iframe width="100%" height="480" src={`https://www.youtube.com/embed/${campaign.videoUrl}`}></iframe>
                        : <img src={`/${campaign.imageUrl}`} className="d-block mx-lg-aut img-fluid" width="640" heigth="480"></img>
                    }
                </div>
               <div className="col-5 mb-5" style={{heigth: 480, scrollbars: true}} >
                    <h2>{campaign.title}</h2>
                    <p><strong>Autor: </strong>{campaign.author}</p>
                    <p className="mb-3">{campaign.description}</p>
                    <p className="mb-3 fst-italic mt-5">
                        E aí, o que achou do projeto? Já foi arrecadado {Web3.utils.fromWei(campaign.balance || 0, "ether")} BNB nesta campanha.
                        O quanto você quer doar (em BNB)?
                    </p>
                    <div className="mb-3">
                        <div className="input-group">
                            <input type="number" id="donation" className="from-control p-3 w-50" value="donation" onChange={onDonationChange}></input>
                            <span className="input-group-text">BNB</span>
                            <button type="button" className="btn btn-primary p-3 w-25" onClick={onDonationClick}>Doar</button>
                        </div>
                    </div>
               </div>
                {
                    message
                    ?   <div className="alert alert-success p-3 col-12 mt-5" role="alert">{message}</div>
                    : <></>
                }
           </div>
        </div>
        </>
    )
}