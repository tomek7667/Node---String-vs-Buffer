import { cerr, cinfo, cwarn, cimp } from "simple-color-print";
import { readFileSync } from "fs";

const maxValue = Number.MAX_VALUE;
const maxSafeInteger = Number.MAX_SAFE_INTEGER;

const test_string = () => {
	let testString = "";
	let counter = 0;
	try {
		while (1) {
			testString += "aaaa";
			counter += 4;
		}
	} catch (e) {
		cerr(e);
		cwarn("Test string length: " + counter);
	}
};

const test_buffer = () => {
	let testBuffer = Buffer.alloc(0);
	let counter = 0;
	try {
		while (1) {
			testBuffer = Buffer.concat([testBuffer, Buffer.alloc(4)]);
			counter += 4;
		}
	} catch (e) {
		cerr(e);
		cwarn("Test buffer length: " + counter);
	}
};

const test_string_file = (p = "samples/mediumboy") => {
	const fileContent = readFileSync(p, "utf8");
	cinfo("File content length: " + fileContent.length);
};

const test_buffer_file = (p = "samples/bigboy", i = 0) => {
	const fileContent = readFileSync(p);
	cinfo("File content length: " + fileContent.length);
	const buffer_character = fileContent[i];
	const string_character = String.fromCharCode(buffer_character);
	cwarn(`"BC='${buffer_character}' -> SC='${string_character}'`);
};

// Conclusion: Using buffer files significantly raises the memory usage

const measureStringSpeed = (p = "samples/mediumboy", log = true) => {
	const fileContent = readFileSync(p, "utf8");
	const start = Date.now();
	for (let character of fileContent) {
		// Do nothing
	}
	const end = Date.now();
	if (log) cinfo(`String speed: ${end - start}ms`);
	return end - start;
};

const measureBufferSpeed = (p = "samples/mediumboy", log = true) => {
	const fileContent = readFileSync(p);
	const start = Date.now();
	for (let character of fileContent) {
		// Do nothing
	}
	const end = Date.now();
	if (log) cinfo(`Buffer speed: ${end - start}ms`);
	return end - start;
};

const averageStringSpeed = (
	p = "samples/mediumboy",
	n = 100,
	verbose = false
) => {
	const results = [];
	for (let i = 0; i < n; i++) {
		results.push(measureStringSpeed(p, verbose));
	}
	const sum = results.reduce((a, b) => a + b, 0);
	const avg = sum / results.length || 0;
	cimp(`Average string speed: ${avg}ms`);
	return avg;
};

const averageBufferSpeed = (
	p = "samples/mediumboy",
	n = 100,
	verbose = false
) => {
	const results = [];
	for (let i = 0; i < n; i++) {
		results.push(measureBufferSpeed(p, verbose));
	}
	const sum = results.reduce((a, b) => a + b, 0);
	const avg = sum / results.length || 0;
	cimp(`Average buffer speed: ${avg}ms`);
	return avg;
};

const p = "samples/mediumboy";
const n = 100;
const verbose = true;

const startDate = Date.now();
averageStringSpeed(p, n, verbose);
averageBufferSpeed(p, n, verbose);
const endDate = Date.now();

cimp(`Overall took: ${endDate - startDate}ms`);
