class Front {
	constructor (){
		const _ = this;

		_.init();
	}


	handlers(){
		const _ = this;

		let detailsBlocks = document.querySelector('.details-blocks');
		if (detailsBlocks) {
			let buttons = document.querySelectorAll('.details-aside-button');
			let blocks = document.querySelectorAll('.details-block-title');
			_.detailsBlocksScroll(detailsBlocks,buttons,blocks);
			_.detailsBlocksScrollBtnActive(detailsBlocks,buttons,blocks);
		}
	}


	detailsBlocksScroll(cont,buttons,blocks){
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener('click',function (e){
				e.preventDefault();
				if (i === buttons.length - 2) cont.scrollTo(0,blocks[i].offsetTop - 300)
				else cont.scrollTo(0,blocks[i].offsetTop - 120)
			})
		}
	}
	detailsBlocksScrollBtnActive(cont,buttons,blocks){
		let scrollData = [];
		for (let i = 0; i < buttons.length; i++) {
			scrollData.push({
				btn: buttons[i],
				top: blocks[i].offsetTop
			})
		}

		let index = 0;
		for (let i = 0; i < scrollData.length; i++){
			if (cont.scrollTop >= scrollData[i].top) index = i;
		}
		scrollData[index].btn.classList.add('active');
		let scrlTopPrev = cont.scrollTop;

		cont.addEventListener('scroll',function (e){
			if (window.innerWidth < 1200) return;

			if (cont.scrollTop < scrlTopPrev){
				scrlTopPrev = cont.scrollTop;
				if (index > 0 && cont.scrollTop <= scrollData[index - 1].top){
					scrollData[index].btn.classList.remove('active')
					index--;
					scrollData[index].btn.classList.add('active')
				}
			} 
			else {
				scrlTopPrev = cont.scrollTop;
				if (cont.scrollTop === cont.scrollHeight - cont.offsetHeight){
					scrollData[index].btn.classList.remove('active')
					index = scrollData.length - 1;
					scrollData[index].btn.classList.add('active')
				} 
				else {
					if (cont.scrollTop + cont.offsetHeight / 3 >= scrollData[index + 1].top && index < scrollData.length - 1){
						scrollData[index].btn.classList.remove('active')
						index++;
						scrollData[index].btn.classList.add('active')
					}
				}
			}
		})
	}

	start(){
		const ctx = document.getElementById('myChart');
		let data = {
			labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
			datasets: [{
				label: '# of Votes',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}]
		}
		const config = {
			type: 'line',
			data: data,
		};
		const myChart = new Chart(ctx, {
			type: 'bar',
			config: config,
			data: data,
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	}

	init(){
		const _ = this;
		_.handlers();
		_.start();
	}
}
new Front();
