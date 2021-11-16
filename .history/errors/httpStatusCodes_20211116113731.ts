
type ResponseClass = "1" | "2" | "3" | "4" | "5";
type HttpStatusCodeDigit = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type OneXXResponse = `${Extract<ResponseClass, "1">}0${"0" | "1" | "2" | "3"}`;
type SuccessfulResponse = `${Extract<ResponseClass, "2">}0${Exclude<HttpStatusCodeDigit, "9">}` | "226";
type ThreeXXResponse = `${Extract<ResponseClass, "3">}0${Exclude<HttpStatusCodeDigit, "9">}`;
type FourXXResponse = `${Extract<ResponseClass, "4">}${"0" | "1" | "2"}${HttpStatusCodeDigit}` | "430" | "431" | "451"; 
type FiveXXResponse = `${Extract<ResponseClass, "5">}${"0"}${Exclude<HttpStatusCodeDigit, "9">}` | "510" | "511"; 

const ac: TwoXXResponse = "208";

interface StatusCodeDatum {
    statusCode: `${ResponseClass}`
}

const httpStatusCodes: StatusCodeDatum[] = [
   { statusCode: '200', cause: 'Ok' },
   { statusCode: '201', cause: 'Created' },
   { statusCode: '202', cause: 'Accepted' },
   { statusCode: '203', cause: 'Non-authorotative information'},
   { statusCode: '204', cause: 'No content' },
   { statusCode: '205', cause: 'Reset content' },
   { statusCode: '206', cause: 'Partial content' },
   { statusCode: '207', cause: 'Multi status' },
   { statusCode: '208', cause: 'Already reported' },
   { statusCode: '226', cause: 'IM used' },
   { statusCode: '300', cause: 'Multiple Choice' },
   { statusCode: '301', cause: 'Moved Permanently' },
   { statusCode: '302', cause: 'Found' },
   { statusCode: '303', cause: 'See other' },
   { statusCode: '304', cause: 'Not modified' },
   { statusCode: '305', cause: 'Use proxy' },
   { statusCode: '306', cause: 'Swich proxy' },
   { statusCode: '307', cause: 'Temporary password' },
   { statusCode: '308', cause: 'Permanent redirect' },
   { statusCode: '400', cause: 'Bad Request' },
   { statusCode: '401', cause: 'Unauthorized' },
   { statusCode: '403', cause: 'Forbidden' },
   { statusCode: '404', cause: 'Not Found' },
   { statusCode: '408', cause: 'Request Timeout' },
   { statusCode: '409', cause: 'Conflict' },
   { statusCode: '410', cause: 'Gone' },
   { statusCode: '411', cause: 'Length Required' },
   { statusCode: '412', cause: 'Precondition Failed' },
   { statusCode: '413', cause: 'Payload too large' },
   { statusCode: '414', cause: 'URI too long' },
   { statusCode: '415', cause: 'Unsupported Media Type' },
   { statusCode: '418', cause: 'I am a teapot' },
   { statusCode: '421', cause: 'Misdirected request' },
   { statusCode: '422', cause: 'Unprocessable Entity', },
   { statusCode: '428', cause: 'Precondition failed' },
   { statusCode: '429', cause: 'Too many requests' },
   { statusCode: '500', cause: 'Internal Server Error' },
   { statusCode: '501', cause: 'Not Implemented' },
   { statusCode: '502', cause: 'Bad Gateway' },
   { statusCode: '503', cause: 'Service Unavailable' },
   { statusCode: '504', cuase: 'Gateway timeout' },
   { statusCode: '505', cause: 'Http version not supported' },
   { statusCode: '507', cause: 'Insufficient Storage' },
   { statusCode: '508', cause: 'Loop Detected' },
   { statusCode: '510', cause: 'Not Extended' },
   { statusCode: '511', cause: 'Network Authentication Required'}
];