const petitionUrl = "https://petition.parliament.uk/petitions/241584.json"

const getPetitionData = () => {
	fetch(petitionUrl, {
		method: 'GET'
	})
	.then(response => response.json())
	.then(response => {
		if ($("#selector").val() === "expat") {
			loadChartData(response.data.attributes.signatures_by_country, response.data.attributes.signature_count)
		} else if ($("#selector").val() === "patriots") {
			loadChartData(response.data.attributes.signatures_by_constituency, response.data.attributes.signature_count)
		}
	})
}

const loadChartData = (petitionData, total_signatures) => {
	let signatures = [];
	let countries = [];
	
	petitionData.forEach( (e) => {
		if (e.name !== "United Kingdom") {
			countries.push(e.name)
			signatures.push(e.signature_count)
		}
	})

	const reducer = (accumulator, currentValue) => accumulator + currentValue;
	if ($("#selector").val() === "expat") {
		$('.title').html(`Revoke Article 50 British Expats By Country: ${signatures.reduce(reducer)}. Total Signatures: ${total_signatures}`)
	} else if ($("#selector").val() === "patriots") {
		$('.title').html(`Revoke Article 50 UK Based Citizens: ${signatures.reduce(reducer)}. Total Signatures: ${total_signatures}`)
	}
	let data = [{
	  values: signatures,
	  labels: countries,
	  textposition: 'inside',
	  type: 'pie'
	}];

	let layout = {
	  height: 1150,
	  width: 1800,
	  legend: {
	  	sort: false
	  }
	};
		
	Plotly.newPlot('chart', data, layout, {responsive: true});
}

getPetitionData();

$("#selector").change(() => {
	getPetitionData();
}) 