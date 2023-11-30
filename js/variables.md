### Notes techniques pour les variables

`@param {Object} cheminement` :
- utilisé pour lister les **cheminements de nivellement** enregistrés et validés par l'utilisateur
- Forme : 
  ```json
  cheminement = 
  {
    "Chem1":
    [
        { "station":"1000", "visee":"1001", "distance":234.45956, "sigma":0.2 },
        { "station":"1001", "visee":"1002", "distance":123.40596, "sigma":0.2 },
        { "station":"1002", "visee":"1003", "distance":90.2394, "sigma":0.2 }
    ],
    "Chem2":
    [
        { "station":"2000", "visee":"2001", "distance":234.45956, "sigma":0.2 },
        { "station":"2001", "visee":"2002", "distance":123.40596, "sigma":0.2 },
        { "station":"2002", "visee":"2003", "distance":90.2394, "sigma":0.2 }
    ]
  }
  ```
  
`@param {Object} gnss_cheminement` :
- utilisé pour lister les **sessions GNSS** enregistrés et validés par l'utilisateur
- Forme :
  ```json
  gnss_cheminement =
  {
    "Session1":
    {
        "parameter": "++++",
        "observation":
        [
            { "point":"1000", "LY":260000.0, "LX":1200000.0, "LH":400.000, "sigma_Y":1.0, "sigma_X":1.0, "sigma_H":1.0 },
            { "point":"1001", "LY":260000.0, "LX":1200000.0, "LH":400.000, "sigma_Y":1.0, "sigma_X":1.0, "sigma_H":1.0 },
            { "point":"1002", "LY":260000.0, "LX":1200000.0, "LH":400.000, "sigma_Y":1.0, "sigma_X":1.0, "sigma_H":1.0 },
        ]
    },
    "Session2":
    {
        "parameter": "++++",
        "observation":
        [
            { "point":"2000", "LY":260000.0, "LX":1200000.0, "LH":400.000, "sigma_Y":1.0, "sigma_X":1.0, "sigma_H":1.0 },
            { "point":"2001", "LY":260000.0, "LX":1200000.0, "LH":400.000, "sigma_Y":1.0, "sigma_X":1.0, "sigma_H":1.0 },
            { "point":"2002", "LY":260000.0, "LX":1200000.0, "LH":400.000, "sigma_Y":1.0, "sigma_X":1.0, "sigma_H":1.0 },
        ]
    }
  }
  ```