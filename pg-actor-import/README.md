# pg-actor-import
This plugins makes excessive use of porn-manager's 'arguments' feature. These arguments must be provided, otherwise the plugin will not work. It also supports dynamic linking between custom fields and Pornganizer fields.


## Configuring the plugin in config.json/yaml

When configuring the plugin inside of the config file, these three arguments must be provided: `pornstarFilePath`, `keyFilePath` and  `verboseLog`.

Example (`config.json`):
```
{
  "PLUGINS": {
    "pg-actor-import": {
      "path": "./plugins/pg-actor.import.js",
      "args": {
	    "pornstarFilePath": "./pg-actor-import/pg-pornstars.json",
	    "keyFilePath": "./plugins/pg-actor-import/keys.json",
            "verboseLog": false
      }
    }
  }
}
```

Example (`config.yaml`):
```
PLUGINS:
  pornganizer-plugin:
    path: ./plugins/pg-actor.import.js
    args: 
        pornstarFilePath: ./plugins/pg-actor-import/pg-pornstars.json
        keyFilePath: ./plugins/pg-actor-import/keys.json
        verboseLog: false
```
File paths must adjusted according to your setup.

## Key mapping in `keys.json`

The `keys.json` in responsible for the mapping between your own `CustomField`s in porn-manager and the fields in your `pornstar.json`. The file consists of two `JSON` objects.  One object for porn-manager `CustomFieldBoth`, one object for your `pornstar.json`. 

Both objects need to have the same objects keys. The value of the `CustomField` object key must match your `CustomField` name. The value of the `pornstars.json` object key must match the object key name in the `pornstar.json`.

Example (CustomField in porn-manager):
| CustomField name |  `keys.json`|
|--|--|
| Eye Color| `"eyeColor": "Eye Color"` |
| Hair Color |`"hairColor": "Hair Color"`|
|Nationality |`"nationality": "Nationality"`|


Example (entries in `pornstars.json`)
|`pornstars.json` field| `keys.json` |
|--|--|
| `"HairColor": "Brown"` | `"hairColor": "HairColor"` |
| `"EyeColor": "Brown"`| `"eyeColor": "EyeColor"`|
|`"Nationality": "United States"`|`"nationality": "Nationality"`|

As you can see the keys `hairColor`, `eyeColor`, `nationality` are in both objects. The `eyeColor` key in the `CustomField` object in responsible for the name of the CustomField. The `eyeColor` key in the `pornstar.json` object is responsible for the name of `EyeColor` field in the `pornstar.json`.

### Example (whole file)

<details>
<summary>Whole files as example</summary>

```
{

	"customFieldKeys": {

		"breastSize": "Breast Size",

		"buttSize": "Butt Size",

		"ethnicity": "Ethnicity",

		"eyeColor": "Eye Color",

		"hairColor": "Hair Color",

		"heightMetric": "Height",

		"weightMetric": "Weight",

		"waistSize": "Waist Size",

		"nationality": "Nationality",

		"birthPlace": "Birthplace"

	},

	"pornganizerKeys": {

		"name": "Name",

		"birthDate": "BirthDate",

		"description": "Description",

		"breastSize": "BreastSize",

		"buttSize": "ButtSize",

		"ethnicity": "Ethnicity",

		"eyeColor": "EyeColor",

		"hairColor": "HairColor",

		"heightMetric": "HeightMetric",

		"weightMetric": "WeightMetric",

		"waistSize": "WaistSize",

		"nationality": "Nationality",

		"birthPlace": "BirthPlace"

	}

}
```
</details>

## Importing specific pornganizer items
If you only want to import specific attributes from your `pornstars.json` then just add the object keys to the according mapping key.