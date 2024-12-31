var app = getApp()
Page({
	data: {
		hidden:false,
		curNav:1,
		curIndex:0,
		cart:[],
		cartTotal:0,
		navList:[
			{
				id:1,
				name:'热销商品'
			},
			{
				id:2,
				name:'生活用品'
			},
			{
				id:3,
				name:'休闲零食'
			},
			{
				id:4,
				name:'酒水饮料'
			}
		],
		varietyList:[
			[
				{
					name:"郭朝阳",
					price:999,
					num:1,
					id:1
				},
				{
					name:"杜璟钰",
					price:88,
					num:1,
					id:29
				},
				{
					name:"张正澍",
					price:666,
					num:1,
					id:2
				}
			],
			[
				{
					name:"餐巾纸",
					price:18,
					num:1,
					id:3
				},
				{
					name:"插线板",
					price:58,
					num:1,
					id:4
				}
			],
			[
				{
					name:"薯片",
					price:18,
					num:1,
					id:5
				},
				{
					name:"饼干",
					price:8,
					num:1,
					id:6
				}
			],
			[
				{
					name:"可乐",
					price:18,
					num:1,
					id:5
				},
				{
					name:"雪碧",
					price:8,
					num:1,
					id:6
				}
      ]
		],
		variety:[]
	},
	loadingChange () {
		setTimeout(() => {
			this.setData({
				hidden:true
			})
		},2000)
	},
	selectNav (event) {
		let id = event.target.dataset.id,
			index = parseInt(event.target.dataset.index);
			self = this;
		this.setData({
			curNav:id,
			curIndex:index
		})
	},
	// 选择菜品
	selectDish (event) {
		let dish = event.currentTarget.dataset.dish;
		let flag = true;
		let	cart = this.data.cart;
		
		if(cart.length > 0){
			cart.forEach(function(item,index){
				if(item == dish){
					cart.splice(index,1);
					flag = false;
				}
			})
		}
		if(flag) cart.push(dish);
		this.setData({
			cartTotal:cart.length
		})
		this.setStatus(dish)
	},
	setStatus (dishId) {
		let variety = this.data.varietyList;
		for (let dish of variety){
			dish.forEach((item) => {
				if(item.id == dishId){
					item.status = !item.status || false
				}
			})
		}
		
		this.setData({
			varietyList:this.data.varietyList
		})
	},
	onLoad () {
		this.loadingChange()
	}
})