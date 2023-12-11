// import { NumericFormat } from 'react-number-format';
import { format } from 'd3-format';
import Swal from 'sweetalert2';
function NumberToPhp(num) {
	const formatter = format(',.2f');
	const formattedNum = formatter(num);
	return `₱ ${formattedNum}`;
}

function TwoDecimalNum(num) {
	const formatter = format('.2f');
	const formattedNum = formatter(num);
	return formattedNum;
}

// NUMBERS TO WORDS WITH DECIMAL (Update) - START
function amountToWords(amount, centsIteration = false) {
	const words = {
		ones: [
			"",
			"one",
			"two",
			"three",
			"four",
			"five",
			"six",
			"seven",
			"eight",
			"nine",
		],
		tens: [
			"",
			"",
			"twenty",
			"thirty",
			"forty",
			"fifty",
			"sixty",
			"seventy",
			"eighty",
			"ninety",
		],
		teens: [
			"ten",
			"eleven",
			"twelve",
			"thirteen",
			"fourteen",
			"fifteen",
			"sixteen",
			"seventeen",
			"eighteen",
			"nineteen",
		],
		thousands: [
			"",
			"thousand",
			"million",
			"billion",
			"trillion",
			"quadrillion",
			"quintillion",
			"sextillion",
			"septillion",
			"octillion",
			"nonillion",
			"decillion",
		],
	};

	// Clean up input
	amount = amount.toString().replace(/,/g, "");

	// Split the number into its integer and decimal parts
	const parts = amount.split(".");
	var integer = parts[0];
	const decimal = parts[1];

	// Convert the integer part to words
	let result = "";
	let numThousands = 0;
	while (integer.length > 0) {
		// Get the last three digits of the integer part
		const chunk = integer.slice(-3);
		integer = integer.slice(0, -3);

		// Convert the chunk to words
		let chunkWords = "";
		if (chunk !== "000") {
			if (chunk.length === 1) {
				if (parseInt(chunk) === 0) {
					chunkWords = "zero";
				} else {
					chunkWords = words.ones[parseInt(chunk)];
				}
			} else if (chunk.length === 2) {
				if (parseInt(chunk) < 20) {
					chunkWords = words.teens[parseInt(chunk) - 10];
				} else {
					chunkWords =
						words.tens[parseInt(chunk[0])] +
						" " +
						words.ones[parseInt(chunk[1])];
				}
			} else if (chunk.length === 3) {
				if (parseInt(chunk[0]) === 0 && parseInt(chunk[1]) === 1) {
					chunkWords =
						words.ones[parseInt(chunk[0])] +
						words.teens[parseInt(chunk[2])];
				} else if (parseInt(chunk[0]) > 0 && parseInt(chunk[1]) === 1) {
					chunkWords =
						words.ones[parseInt(chunk[0])] +
						" hundred " +
						words.teens[parseInt(chunk[2])];
				}
				else if (parseInt(chunk[0]) === 0 && parseInt(chunk[1]) === 0) {
					chunkWords = words.ones[parseInt(chunk[2])];
				} else if (parseInt(chunk[0]) === 0 && parseInt(chunk[1]) > 0) {
					chunkWords =
						words.ones[parseInt(chunk[0])] +
						words.tens[parseInt(chunk[1])] +
						" " +
						words.ones[parseInt(chunk[2])];
				} else {
					chunkWords =
						words.ones[parseInt(chunk[0])] +
						" hundred " +
						words.tens[parseInt(chunk[1])] +
						" " +
						words.ones[parseInt(chunk[2])];
				}
			}

			if (numThousands > 0) {
				chunkWords += " " + words.thousands[numThousands];
			}
		}
		result = chunkWords + " " + result;
		numThousands++;
	}

	// Add the appropriate suffix
	if (decimal === undefined) {
		if (!centsIteration) {
			result += "pesos only";
		}
	} else {
		const cents = parseInt(decimal.padEnd(2, "0"));
		let centsWords = "";
		if (cents === 1) {
			centsWords = "one cent only";
		} else if (cents > 1) {
			centsWords = amountToWords(cents, true) + " cents only";
		}
		result += "pesos";
		if (centsWords) {
			result += " and " + centsWords;
		}
	}

	return result.replace(/\s+/g, ' ').trim();
}
// NUMBERS TO WORDS WITH DECIMAL (Update) - END



// CAPITALIZED EVERY FIRST LETTER OF EVERY WORD - START
function toTitleCase(str) {
	const titleCase = str
		.toLowerCase()
		.split(' ')
		.map(word => {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(' ');

	return titleCase.replace(/\s+/g, ' ').trim();
}
// CAPITALIZED EVERY FIRST LETTER OF EVERY WORD - END


// Number Format with decimal - START
function numberFormating(numStr) {
	const numberFormat = new Intl.NumberFormat('en-PH');
	// const totalamountlocal = (serviceList.reduce((total,{particulars_amount}) => total + parseFloat(particulars_amount) , 0 ));
	return numStr = numberFormat.format(numStr);
}

function currencyFormat(num) {
	if (isNaN(num)) {
		return '₱ ' + num
	} else {
		num = (Math.round(num * 100) / 100).toFixed(2);
		return '₱ ' + num
	}
}
// Number Format with decimal - END

// Standard DateFormat
function mmddyyWord(date) {
	return new Date(date).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" });
}

// Removing Duplicate Values in Array
function uniq(a) {
	var prims = { "boolean": {}, "number": {}, "string": {} }, objs = [];

	return a.filter(function (item) {
		var type = typeof item;
		if (type in prims)
			return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
		else
			return objs.indexOf(item) >= 0 ? false : objs.push(item);
	});
}


const Required = _ => {
	return (
		<span style={{ color: "red" }}>*</span>
	)
}

const swalWithBootstrapButtons = Swal.mixin({
	customClass: {
		confirmButton: 'btn btn-success',
		cancelButton: 'btn btn-danger'
	},
	buttonsStyling: false
})

function hasItems(obj) {
	for (const prop in obj) {
		if (Object.hasOwn(obj, prop)) {
			return true;
		}
	}

	return false;
}

export { Required, NumberToPhp, amountToWords, toTitleCase, numberFormating, currencyFormat, mmddyyWord, uniq, hasItems, TwoDecimalNum, swalWithBootstrapButtons };
