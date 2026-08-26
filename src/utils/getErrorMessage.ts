import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function getErrorMessage(error: FetchBaseQueryError | SerializedError):string{
    if('status' in error){
        return `Error ${error.status}`;
    }
    return error.message ?? 'Something went wrong';
}

export default getErrorMessage;