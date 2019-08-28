const revokeUrl = "https://petition.parliament.uk/petitions/241584.json"
const leaveUrl = "https://petition.parliament.uk/petitions/229963.json"
const noProrogue = "https://petition.parliament.uk/petitions/269157.json"

const getPetitionData = (url) => {
		fetch(url, {
			method: 'GET'
		})
	.then(response => response.json())
	.then(response => {
		if ($("#citizenSelector").val() === "expat") {
			loadChartData(response.data.attributes.signatures_by_country, response.data.attributes.signature_count)
		} else if ($("#citizenSelector").val() === "patriots") {
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
	if ($("#citizenSelector").val() === "expat" && $("#petitionSelector").val() === "revoke") {
		$('.title').html(`Revoke Article 50 British Expats By Country: ${signatures.reduce(reducer)}. Total Signatures: ${total_signatures}`)
	} else if ($("#citizenSelector").val() === "patriots" && $("#petitionSelector").val() === "revoke") {
		$('.title').html(`Revoke Article 50 UK Based Citizens: ${signatures.reduce(reducer)}. Total Signatures: ${total_signatures}`)
	} else if ($("#citizenSelector").val() === "patriots" && $("#petitionSelector").val() === "leave") {
		$('.title').html(`Leave With No Deal UK Based Citizens: ${signatures.reduce(reducer)}. Total Signatures: ${total_signatures}`)
	}	else if ($("#citizenSelector").val() === "expat" && $("#petitionSelector").val() === "leave") {
		$('.title').html(`Leave With No Deal British Expats By Country: ${signatures.reduce(reducer)}. Total Signatures: ${total_signatures}`)
	} else if ($("#citizenSelector").val() === "expat" && $("#petitionSelector").val() === "prorogue") {
		$('.title').html(`Do Not Prorogue Parliament Expats By Country: ${signatures.reduce(reducer)}. Total Signatures: ${total_signatures}`)
	} else if ($("#citizenSelector").val() === "patriots" && $("#petitionSelector").val() === "prorogue") {
		$('.title').html(`Do Not Prorogue Parliament UK Based Citizens: ${signatures.reduce(reducer)}. Total Signatures: ${total_signatures}`)
	}
	let data = [{
	  values: signatures,
	  labels: countries,
	  textposition: 'inside',
	  type: 'pie'
	}];

	let layout = {
	  height: 900,
	  legend: {
	  	sort: false
	  }
	};
		
	Plotly.newPlot('chart', data, layout, {responsive: true});
}

getPetitionData(revokeUrl);

$("#citizenSelector").change(() => {
	if ($("#petitionSelector").val() === "revoke") {
		getPetitionData(revokeUrl);
	} else if ($("#petitionSelector").val() === "leave") {
		getPetitionData(leaveUrl);
	} else if ($("#petitionSelector").val() === "prorogue") {
		getPetitionData(noProrogue);
	}
})

$("#petitionSelector").change(() => {
	if ($("#petitionSelector").val() === "revoke") {
		getPetitionData(revokeUrl);
	} else if ($("#petitionSelector").val() === "leave") {
		getPetitionData(leaveUrl);
	} else if ($("#petitionSelector").val() === "prorogue") {
		getPetitionData(noProrogue);
	}
}) 