import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish'
import sampleFishes from '../sample-fishes.js';

class App extends React.Component
{
	constructor(){
		super();
		//bind user created method to class
		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		//get initial state
		this.state = {
			fishes: {},
			order: {}
		};
	}

	addFish(fish)
	{
		//update our state
		const fishes = {...this.state.fishes};

		//add in our new fish	
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish; 

		//set state 
		this.setState({fishes: fishes})
	}

	addToOrder(key)
	{
		//take a copy of our state
		const order = {...this.state.order};
		//update or add the new number of fish ordered
		order[key] = order[key] + 1 || 1;
		//update our state
		this.setState({order: order});

	}
	loadSamples()
	{
		this.setState({
		fishes: sampleFishes
		});
	}
	render()
	{
		return(
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafod Market"/>
					<ul className="list-of-fishes">
						{
							Object
								.keys(this.state.fishes)
								.map(key => <Fish addToOrder={this.addToOrder} key={key} index={key} details={this.state.fishes[key]}/>)
							}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order} />
				<Inventory loadSamples={this.loadSamples} addFish={this.addFish}/>
			</div>
		)
	}
}

export default App;