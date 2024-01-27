export const fileConfig = {
    bucket: {
        essentialBucket:"very-input-bucket-",
        dataBucket: "very-output-bucket-"
    },
    glue: {
        jobName: "script-to-run-",
        description:"this is test job-"
    },
    lambda:{
        functionName:"invoke-sns-function"
    },
    sns:{
        topic:"your-topic"
    }
};
