import { Response, Request } from 'express'

export type ResponseClass = "1" | "2" | "3" | "4" | "5";
export type HttpStatusCodeDigit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type Informational = `${Extract<ResponseClass, "1">}0${"0" | "1" | "2" | "3"}`;
export type Success = `${Extract<ResponseClass, "2">}0${Exclude<HttpStatusCodeDigit, "9">}` | "226";
export type Redirect = `${Extract<ResponseClass, "3">}0${Exclude<HttpStatusCodeDigit, "9">}`;
export type ClientError = (
            `${Extract<ResponseClass, "4">}${"0" | "1" | "2"}${HttpStatusCodeDigit}` 
            | "430" | "431" | "451"
            ); 
export type ServerError = `${Extract<ResponseClass, "5">}${"0"}${Exclude<HttpStatusCodeDigit, "9">}` | "510" | "511"; 

export type HttpResponse<T> = {
    statusCode: T;
    message: string; 
};

export type HttpResponseClass<T> = HttpResponse<T>[];
export type IanaHttpStatusCode = Informational | Success | Redirect | ClientError | ServerError;

export const informationalResponses: HttpResponseClass<Informational> = [
    { statusCode: "100", message: "Continue" },
    { statusCode: "101", message: "Switching Protocols" },
    { statusCode: "102", message: "Processing" },
    { statusCode: "103", message: "Early Hints" },
]

export const successResponses: HttpResponseClass<Success>  = [
   { statusCode: "200", message: "Ok" },
   { statusCode: "201", message: "Created" },
   { statusCode: "202", message: "Accepted" },
   { statusCode: "203", message: "Non-authorotative information"},
   { statusCode: "204", message: "No content" },
   { statusCode: "205", message: "Reset content" },
   { statusCode: "206", message: "Partial content" },
   { statusCode: "207", message: "Multi status" },
   { statusCode: "208", message: "Already reported" },
   { statusCode: "226", message: "IM used" },
];

export const redirectionResponses: HttpResponseClass<Redirect> = [
   { statusCode: "300", message: "Multiple Choice" },
   { statusCode: "301", message: "Moved Permanently" },
   { statusCode: "302", message: "Found" },
   { statusCode: "303", message: "See other" },
   { statusCode: "304", message: "Not modified" },
   { statusCode: "305", message: "Use proxy" },
   { statusCode: "306", message: "Swich proxy" },
   { statusCode: "307", message: "Temporary password" },
   { statusCode: "308", message: "Permanent redirect" }
];

export const clientErrorResponses: HttpResponseClass<ClientError> = [
   { statusCode: "400", message: "Bad Request" },
   { statusCode: "401", message: "Unauthorized" },
   { statusCode: "403", message: "Forbidden" },
   { statusCode: "404", message: "Not Found" },
   { statusCode: "408", message: "Request Timeout" },
   { statusCode: "409", message: "Conflict" },
   { statusCode: "410", message: "Gone" },
   { statusCode: "411", message: "Length Required" },
   { statusCode: "412", message: "Precondition Failed" },
   { statusCode: "413", message: "Payload too large" },
   { statusCode: "414", message: "URI too long" },
   { statusCode: "415", message: "Unsupported Media Type" },
   { statusCode: "418", message: "I am a teapot" },
   { statusCode: "421", message: "Misdirected request" },
   { statusCode: "422", message: "Unprocessable Entity", },
   { statusCode: "428", message: "Precondition failed" },
   { statusCode: "429", message: "Too many requests" },
];

export const serverErrorResponses: HttpResponseClass<ServerError> = [
   { statusCode: "500", message: "Internal Server Error" },
   { statusCode: "501", message: "Not Implemented" },
   { statusCode: "502", message: "Bad Gateway" },
   { statusCode: "503", message: "Service Unavailable" },
   { statusCode: "504", message: "Gateway timeout" },
   { statusCode: "505", message: "Http version not supported" },
   { statusCode: "507", message: "Insufficient Storage" },
   { statusCode: "508", message: "Loop Detected" },
   { statusCode: "510", message: "Not Extended" },
   { statusCode: "511", message: "Network Authentication Required"}
];

const httpStatusCodes: HttpResponseClass<IanaHttpStatusCode> = [
    ...informationalResponses,
    ...successResponses,
    ...redirectionResponses,
    ...clientErrorResponses,
    ...serverErrorResponses
]; 

export default httpStatusCodes;

