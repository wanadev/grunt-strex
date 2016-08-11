var Class = require("abitbol");

var Person = Class.$extend({

    getFirstName: function () {
        "@type String";
        return this.$data.firstName;
    },

    setFirstName: function (value) {
        this.$data.firstName = String(value);
    },

    getLastName: function () {
        "@type String";
        return this.$data.lastName;
    },

    setLastName: function (value) {
        this.$data.lastName = String(value);
    },

    getFullName: function () {
        "@type String";
        return this.$data.firstName + " " + this.$data.lastName;
    },

    getHeightCentimeter: function () {
        "@type Number";
        return this.$data.height;
    },

    setHeightCentimeter: function (value) {
        this.$data.height = Number(value);
    },

    getHeightInch: function () {
        "@type Number";
        return this.heightCentimeter * 0.394;
    },

    setHeightInch: function (value) {
        this.heightCentimeter = Number(value) * 2.54;
    }
});

module.exports = Person;
