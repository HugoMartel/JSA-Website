import { NextApiRequest, NextApiResponse } from 'next'

export default (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    "year": 2022,
    "bureau": {
      "president": "Thibault WARTEL",
      "vice-president": "Alex DESBONNET",
      "secretaire": "Maxence DUCOULOMBIER",
      "tresorier": "Hugo MARTEL",
      "communication": "Nicolas BOIZARD",
      "evenements": "Adrien BEAUMONT"
     }
    })
}
