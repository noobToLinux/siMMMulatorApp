# siMMMulatorApp

(INCOMPLETE)

siMMMulatorApp is a web application that allows you to generate the input for the siMMMulator inside the siMMMulador folder which generates simulated data that you may use it in your MMM model.

## Introduction

I have been learning about marketing and marketing mix modelling (MMM), specially about Robyn. To test this and any MMM model it is required some real marketing data. When this is not available you may use some MMM data simulators.

The idea of this app was to make some MMM model simulator that allowed you to visualize the behaviour of the data previous to its generation, reducing the cognitive load of thinking how they will behave while defining the adStock, saturation and campaign frequency params.

For better understanding of the adstock and saturation params you may check Robyn documentation.

## How to use it

This web apps allows you to generate the params you will pass to the siMMMulator mentioned before. To do so you need to define the next parameters:

* ***Name of variables:*** This is the names of the variables that represent the spends on each of the marketing channels.
* ***Date range:*** The start date of the date, the end date and the date frequency (daily, weekly, monthly).
* ***Variables ranges:*** The range of the spend variables. Since this is a monetary value, they must be the minimum and maximum spend on each channel.
* ***Adstock:*** This is, the adstock you want to use and the parameters for each variable. The adstock type is the same for each variable.
* ***Saturation:*** The saturation params for each variable.
* ***Campagin frequency:*** The frequency value for the sin function of the campaign.

## References

As mentioned before, most of the credits should go to the next references.

* [Robyn](https://github.com/facebookexperimental/Robyn)
* [siMMMulator](https://github.com/facebookexperimental/siMMMulator)

Otros MMM.

* [lightweight_MMM](https://github.com/google/lightweight_mmm)
* [pymc](https://github.com/pymc-labs/pymc-marketing)