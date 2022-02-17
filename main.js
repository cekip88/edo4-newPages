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
			labels: ['05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'],
			datasets: [{
				label: 'CPU %',
				data: [38, 50, 55, 40, 60, 75, 85, 75, 90, 80, 60, 40],
				backgroundColor: [
					'rgba(70, 132, 226, 1)',
				],
				borderColor: [
					'rgba(70, 132, 226, 1)',
				],
				borderWidth: 4
			}]
		}
		const myChart = new Chart(ctx, {
			type: 'line',
			data: data,
			options: {
				borderJoinStyle: 'round',
				scales: {
					y: {
						beginAtZero: false
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
