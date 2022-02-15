module.exports = {
    normalizePYnumber : (number) => {
        number = number.replace(/\s/g, '');
        regex = /^(\+?(595)|0)(9[0-9]{2})([0-9\-]{6})$/;
       
        if(!regex.test(number))
            return null;
            
        matches =  number.match(regex);
        partial = matches[3] + matches[4];
        return {
            "msisdn" : '+595' + partial
            ,"local" : '0' + partial
            ,"area" : '0' + matches[3] 
            ,"number" : matches[4]
        }
    }
};