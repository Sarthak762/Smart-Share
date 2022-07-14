import LZString from "lz-string";
var string = "This is my compression test.";
alert("Size of sample is: " + string.length);
var compressed = LZString.compress(string);
alert("Size of compressed sample is: " + compressed.length);
string = LZString.decompress(compressed);
alert("Sample is: " + string);
