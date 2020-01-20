const request = require('request-promise');
const express = require('express')

exports.getSomethingFromCallback = function getSomethingFromCallback(callback) {
    //for callback approach 
    const options = {
        'method': 'GET',
        'uri': 'https://jsonplaceholder.typicode.com/todos/1'

    }
    request(options)
        .then((response) => {
            //console.log(response)
            callback(JSON.parse(response))

        })
        .catch(function (error) {
            console.log(error)
        })
}

//for promise and async approach
exports.getSomethingFromPromise1 = function getSomethingFromPromise1(id) {
    return new Promise((resolve, reject) => {
        //for GET
        const options = {
            'method': 'GET',
            'uri': 'https://jsonplaceholder.typicode.com/todos/' + id

        }
        request(options)
            .then((response) => {
                resolve(JSON.parse(response))

            })
            .catch(function (error) {
                console.log(error)
            })

    });

}

exports.getSomethingFromPromise2 = function getSomethingFromPromise2() {
    return new Promise((resolve, reject) => {
        //for GET
        const options = {
            'method': 'GET',
            'uri': 'https://jsonplaceholder.typicode.com/todos/1'

        }
        request(options)
            .then((response) => {
                resolve(response)

            })
            .catch(function (error) {
                console.log(error)
            })

    });

}

exports.postSomethingFromPromise = function postSomethingFromPromise(body) {
    return new Promise((resolve, reject) => {
        //for POST
        const options = {
            method: 'POST',
            uri: 'http://dummy.restapiexample.com/api/v1/create',
            body: {
                'name': body.name,
                'salary': body.salary
            },
            json: true
        }
        request(options)
           .then(function(value){
              resolve(value)
           })
           .catch(function(error){
               console.log(error)
           })

        //or

        // request({
        //     url: 'http://dummy.restapiexample.com/api/v1/create',
        //     method: "POST",
        //     json:true,
        //     body: {
        //         'name': body.name,
        //         'salary': body.salary,
        //         'age':body.age
        //     }
        // },
        // (error,response,body)=>{
        //     resolve(body)
        // });

    });

}



