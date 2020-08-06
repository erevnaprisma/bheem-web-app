import React, { Component } from 'react'

export default class PlansPricingOverview extends Component {
    render() {
        const liStyle={
            color:'#fff'
        }
        const btnStyle={
            background:'transparent',
            backgroundColor:'transparent',
            
            borderWidth:3,
            borderColor:'#fff',
            color:'#fff',
            borderRadius:10,
            outline:0,
            marginTop:30,
            outline:'transparent'
        }
        const plans=[
            { pnp:'Free',price:'0',btn:'Order Now',rules:['Free 50 Minutes','120 Participants','3 Co-hosts'] },
            { pnp:'Pro',price:'15',btn:'Order Now',rules:['24 hours','120 Participants','5 Co-hosts'] },
            { pnp:'Business',price:'20',btn:'Order Now',rules:['24 hours','300 Participants','6 Co-hosts'] },
            { pnp:'Entertaiment',price:'25',btn:'Order Now',rules:['All business features','Dedicated data center'] },
        ]
        return (
            <div className="text-center">
                <div className="row">
                    <div className="col-md-8 ml-auto mr-auto">
                        <h2 className="title">Plans and Pricing</h2>
                    </div>
                </div>
                <div className="features">
                    <div className="row">
                        {( 
                            plans.map((r,i)=>
                                <div className="col-md-4" key={i}>
                                    <div className="info" style={{background:'#E9001E',marginTop:10,padding:10,paddingBottom:30,borderRadius:10}}>
                                        <h2 className="info-title" style={{margin:5,fontSize:30,color:'white'}}>{r.pnp}</h2>
                                        <b><h4 className="info-title" style={{margin:5,fontSize:30,color:'white'}}><sup>$</sup>{r.price}<span> / month</span></h4></b>
                                        {r.rules.map((s,j)=>
                                            <li style={liStyle} key={j}>{s}</li>
                                         )}
                                         <button style={btnStyle} >{r.btn}</button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}
