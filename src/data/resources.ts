export type Resource = {
	additionalResources?: Resource[];
	address: string;
	email?: string;
	hours: {
		en: string[];
		es: string[];
	};
	idRequired: boolean;
	name: {
		en: string;
		es: string;
	};
	map: {
		en: string;
		es: string;
	};
	notes?: {
		en: string;
		es: string;
	};
	phone?: string;
	services?: {
		en: string;
		es: string;
	};
	updated: string;
	website?: string;
};

const resources: Resource[] = [
	{
		address: "501 Howard Street, McKinney, TX 75069",
		hours: {
			en: [
				"Monday 6:00 PM - 8:00 PM",
				"Tuesday 6:00 PM - 8:00 PM",
				"Wednesday 6:00 PM - 8:00 PM",
				"Thursday 6:00 PM - 8:00 PM",
			],
			es: [
				"Lunes 6:00 PM - 8:00 PM",
				"Martes 6:00 PM - 8:00 PM",
				"Miércoles 6:00 PM - 8:00 PM",
				"Jueves 6:00 PM - 8:00 PM",
			],
		},
		idRequired: false,
		map: {
			en: "https://map2me.link/community-garden-kitchen-lf9z",
			es: "https://map2me.link/cocina-con-jardin-comunitario-community-xx6i",
		},
		name: {
			en: "Community Garden Kitchen",
			es: "Cocina con Jardín Comunitario",
		},
		services: {
			en: "Free restaurant style meals for your whole family",
			es: "Comidas estilo restaurante gratuitas para toda tu familia.",
		},
		updated: "2026-05-29T07:00:00-05:00",
		website: "https://communitygardenkitchen.org/",
	},
	{
		address: "600 Wilson Creek Parkway, McKinney, TX 75069",
		hours: {
			en: [
				"Monday 9:30 AM - 11:30 AM",
				"Wednesday 9:30 AM - 11:30 AM",
				"Friday  9:30 AM - 11:30 AM",
			],
			es: [
				"Lunes 9:30 AM - 11:30 AM",
				"Miércoles 9:30 AM - 11:30 AM",
				"Viernes  9:30 AM - 11:30 AM",
			],
		},
		idRequired: true,
		map: {
			en: "https://map2me.link/the-salvation-army-of-mckinney-4xxm",
			es: "https://map2me.link/el-ejercito-de-salvacion-de-mckinney-the-tcrs",
		},
		name: {
			en: "The Salvation Army of McKinney",
			es: "El Ejército de Salvación de McKinney",
		},
		notes: {
			en: "Bring photo ID and proof of residency (utility bill or similar). Fresh produce available on Monday and Wednesday mornings.",
			es: "Traer identificación con fotografía y comprobante de residencia (factura de servicios públicos o similar). Productos frescos disponibles los lunes y miércoles por la mañana.",
		},
		phone: "(972) 542-6694",
		services: {
			en: "Food pantry",
			es: "Despensa de alimentos",
		},
		updated: "2026-05-29T07:00:00-05:00",
		website: "https://salvationarmyntx.org/north-texas/mckinney",
	},
	{
		address: "1601 North Waddill Street, Suite 102, McKinney, TX 75069",
		hours: {
			en: [
				"Tuesday 10:00 AM - 1:00 PM, 1:30 PM - 2:45 PM",
				"Wednesday 10:00 AM - 1:00 PM, 1:30 PM - 2:45 PM",
				"Thursday 10:00 AM - 1:00 PM, 1:30 PM - 2:45 PM",
				"Friday 9:00 AM - 1:45 PM",
			],
			es: [
				"Martes 10:00 AM - 1:00 PM, 1:30 PM - 2:45 PM",
				"Miércoles 10:00 AM - 1:00 PM, 1:30 PM - 2:45 PM",
				"Jueves 10:00 AM - 1:00 PM, 1:30 PM - 2:45 PM",
				"Viernes 9:00 AM - 1:45 PM",
			],
		},
		idRequired: true,
		map: {
			en: "https://map2me.link/the-samaritan-inn-food-pantry-y0w0",
			es: "https://map2me.link/the-samaritan-inn-food-pantry-o98g",
		},
		name: {
			en: "The Samaritan Inn Food Pantry",
			es: "The Samaritan Inn Food Pantry",
		},
		notes: {
			en: "Complete online application for financial assistance if qualified.",
			es: "Complete la solicitud en línea para asistencia financiera si califica.",
		},
		phone: "(972) 547-5567",
		services: {
			en: "Food pantry",
			es: "Despensa de alimentos",
		},
		updated: "2026-05-29T07:00:00-05:00",
		website: "https://saminn.org/food-pantry/",
		additionalResources: [
			{
				address: "401 West Erwin Avenue, McKinney, TX 75069",
				hours: {
					en: ["Every Third Saturday of the Month 9:00 AM - 11:00 AM"],
					es: ["Cada tercer sábado del mes de 9:00 AM a 11:00 AM"],
				},
				idRequired: false,
				map: {
					en: "https://map2me.link/mckinney-first-baptist-church-aiu6",
					es: "https://map2me.link/mckinney-first-baptist-church-b1fk",
				},
				name: {
					en: "McKinney First Baptist Church",
					es: "McKinney First Baptist Church",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribución móvil de alimentos",
				},
				updated: "2026-04-29T07:00:00-05:00",
			},
			{
				address: "1800 West Hunt Street, McKinney, TX 75069",
				hours: {
					en: ["Every First Saturday of the Month 9:00 AM - 10:30 AM"],
					es: ["Every First Saturday of the Month 9:00 AM - 10:30 AM"],
				},
				idRequired: false,
				map: {
					en: "https://map2me.link/first-christian-church-mckinney-clxx",
					es: "https://map2me.link/first-christian-church-mckinney-70w8",
				},
				name: {
					en: "First Christian Church McKinney",
					es: "First Christian Church McKinney",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribución móvil de alimentos",
				},
				updated: "2026-04-29T07:00:00-05:00",
			},
			{
				address: "102 West Lamar Street, McKinney, TX 75069",
				hours: {
					en: [
						"Every Second Saturday of the Month 9:30 AM - 11:00 AM",
						"Every Fourth Saturday of the Month 9:30 AM - 11:00 AM",
					],
					es: [
						"Cada segundo sábado del mes de 9:30 AM a 11:00 AM",
						"Cada cuarto sábado del mes de 9:30 AM a 11:00 AM",
					],
				},
				idRequired: false,
				map: {
					en: "https://map2me.link/first-united-methodist-church-s8vy",
					es: "https://map2me.link/first-united-methodist-church-g7be",
				},
				name: {
					en: "First United Methodist Church",
					es: "First United Methodist Church",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribución móvil de alimentos",
				},
				updated: "2026-04-29T07:00:00-05:00",
			},
		],
	},
	{
		address: "1711 Parker Road, Wylie, TX 75098",
		hours: {
			en: [
				"Tuesday 10:00 AM - 2:00 PM",
				"Thursday 6:00 PM - 8:00 PM, Closed November 25, 2023",
				"Saturday 8:00 PM - 12:00 PM",
			],
			es: [
				"Martes 10:00 AM - 2:00 PM",
				"Jueves 6:00 PM - 8:00 PM, Cerrado el 25 de noviembre de 2023",
				"Sábado  8:00 PM - 12:00 PM",
			],
		},
		idRequired: false,
		map: {
			en: "https://map2me.link/amazing-grace-food-pantry-5iwq",
			es: "https://map2me.link/amazing-grace-food-pantry-zgw0",
		},
		name: {
			en: "Amazing Grace Food Pantry",
			es: "Amazing Grace Food Pantry",
		},
		phone: "(972) 292-7241",
		services: {
			en: "Food pantry",
			es: "Despensa de alimentos",
		},
		updated: "2026-05-29T07:00:00-05:00",
		website: "http://www.amazinggracepantry.org",
	},
	{
		address: "411 Paula Road, McKinney, TX 75069",
		hours: {
			en: ["Tuesday 2:00 PM - 4:00 PM", "Third Thursday 2:00 PM - 4:00 PM"],
			es: ["Martes 2:00 PM - 4:00 PM", "Tercer jueves de 14:00 a 16:00"],
		},
		idRequired: true,
		map: {
			en: "https://map2me.link/st-vincent-de-paul-hosted-at-st-michael-p0nm",
			es: "https://map2me.link/st-vincent-de-paul-hosted-at-st-michael-tym9",
		},
		name: {
			en: "St. Vincent de Paul (hosted at St. Michael the Archangel)",
			es: "St. Vincent de Paul",
		},
		notes: {
			en: "Must bring photo ID and proof of residency (utility bill or similar). Can use the pantry once over 2 weeks.",
			es: "Debe traer identificación con fotografía y comprobante de residencia (factura de servicios públicos o similar). Se puede usar la despensa una vez cada dos semanas.",
		},
		phone: "(214) 973-3435",
		services: {
			en: "Food pantry",
			es: "Despensa de alimentos",
		},
		updated: "2026-05-01T07:00:00-05:00",
		website: "https://stmichaelmckinney.org/st-vincent-de-paul-",
	},
	{
		address: "3107 McKinney Street (Hwy 5), Melissa, TX 75454",
		email: "Tammy@25project.org",
		hours: {
			en: ["Monday 5:00 PM - 6:30 PM", "Thursday 5:00 PM - 6:30 PM"],
			es: ["Lunes 5:00 PM - 6:30 PM", "Jueves 5:00 PM - 6:30 PM"],
		},
		idRequired: true,
		map: {
			en: "https://map2me.link/melissa-community-outreach-cudk",
			es: "https://map2me.link/melissa-community-outreach-413g",
		},
		name: {
			en: "Melissa Community Outreach",
			es: "Melissa Community Outreach",
		},
		notes: {
			en: "May come once every 2 weeks.",
			es: "Puede venir una vez cada 2 semanas.",
		},
		phone: "(972) 521-7325",
		services: {
			en: "Food pantry",
			es: "Despensa de alimentos",
		},
		updated: "2026-05-29T07:00:00-05:00",
		website: "https://25project.org/locations/mco/",
	},
	{
		address: "801 East Main Street, Allen, TX 75002",
		hours: {
			en: [
				"Tuesday 9:00 AM - 6:00 PM (Choice Shopping)",
				"Thursday 9:00 AM - 6:00 PM (Choice Shopping)",
				"Friday 12:00 PM - 2:00 PM (Curbside Pickup)",
			],
			es: [
				"Martes 9:00 AM - 6:00 PM (Compras a elección)",
				"Jueves 9:00 AM - 6:00 PM (Compras a elección)",
				"Viernes 12:00 PM - 2:00 PM (Recogida en la acera)",
			],
		},
		idRequired: true,
		map: {
			en: "https://map2me.link/all-community-outreach-1tds",
			es: "https://map2me.link/all-community-outreach-5i9s",
		},
		name: {
			en: "All Community Outreach",
			es: "All Community Outreach",
		},
		notes: {
			en: "APPOINTMENT REQUIRED! Proof of Collin County residency is required. For new clients, a QR code will be emailed after completion of a brief application in the drive-thru line. The QR code is required for future visits. Sometimes the need for food is NOW. For those extreme situations ACO’s 801 E. Main Street location stocks a limited number of basic food supplies in our main office. If you are in need of emergency food, call ACO’s office at 972-727-9131.",
			es: "¡SE REQUIERE CITA PREVIA! Se requiere prueba de residencia en el condado de Collin. Para los nuevos clientes, se les enviará un código QR por correo electrónico después de completar una breve solicitud en la fila del autoservicio. El código QR es necesario para futuras visitas. A veces la necesidad de comida es AHORA. Para esas situaciones extremas, la ubicación de ACO en 801 E. Main Street almacena una cantidad limitada de suministros de alimentos básicos en nuestra oficina principal. Si necesita alimentos de emergencia, llame a la oficina de ACO al 972-727-9131.",
		},
		phone: "(972) 727-9131",
		services: {
			en: "Food pantry and financial assistance",
			es: "Despensa de alimentos y asistencia financiera",
		},
		updated: "2026-05-29T07:00:00-05:00",
		website: "https://www.acocares.org/need-help/",
	},
	{
		address:
			"Hope Fellowship Church, 1702 West University Drive, McKinney, TX 75069",
		email: "hhkhut33@gmail.com",
		hours: {
			en: [
				"Second Saturday Mornings,  8:30 Am - 9:30 AM, TUPPS Brewery, 402 E Louisiana St",
			],
			es: [
				"Segundo sábado de cada mes, de 8:30 a. m. a 9:30 a. m., TUPPS Brewery, 402 E Louisiana St",
			],
		},
		idRequired: true,
		map: {
			en: "https://map2me.link/baby-booties-diaper-bank-tb7h",
			es: "https://map2me.link/banco-de-panales-para-patucos-de-bebe-ba-euqk",
		},
		name: {
			en: "Baby Booties Diaper Bank",
			es: "Banco de pañales para patucos de bebé",
		},
		notes: {
			en: "Eligibility Requirements: 1) Child under three years old 2) You find it hard to buy diapers and wipes each month 3) You are the main caregiver for the child 4) Collin County resident",
			es: "Se requiere prueba de residencia en el condado de Collin. Para los nuevos clientes, se les enviará un código QR por correo electrónico después de completar una breve solicitud en la fila del autoservicio. El código QR es necesario para futuras visitas. A veces la necesidad de comida es AHORA. Para esas situaciones extremas, la ubicación de ACO en 801 E. Main Street almacena una cantidad limitada de suministros de alimentos básicos en nuestra oficina principal. Si necesita alimentos de emergencia, llame a la oficina de ACO al 972-727-9131.",
		},
		phone: "(469) 939–9316",
		services: {
			en: "Provides diapers, wipes, period products, and occasionally formula to families",
			es: "Proporciona pañales, toallitas húmedas, productos para la menstruación y, ocasionalmente, fórmula a las familias.",
		},
		updated: "2026-05-29T07:00:00-05:00",
		website: "https://babybootiesdiaperbank.org/get-help/",
	},
	{
		address: "3101 Coit Road, Plano, TX 75075",
		email: "cumc@cumc.com",
		hours: {
			en: [
				"Every First Thursday 1:00 PM - 2:30 PM, South Parking Lot. NO DISTRIBUTION IN JULY 2026",
			],
			es: [
				"Cada primer jueves de 1:00 PM a 2:30 PM, estacionamiento sur. NO HABRÁ DISTRIBUCIÓN EN JULIO DE 2026",
			],
		},
		idRequired: false,
		map: {
			en: "https://map2me.link/christ-united-methodist-church-corner-pa-9u3n",
			es: "https://map2me.link/christ-united-methodist-church-corner-pa-igji",
		},
		name: {
			en: "Christ United Methodist Church Corner Pantry",
			es: "Christ United Methodist Church Corner Pantry (Despensa de Esquina)",
		},
		services: {
			en: "The Christ United Methodist Church Corner Pantry is hosting its Mobile Food Bank events on the first Thursday of every month. Partnered with The North Texas Food Bank and Catholic Charities, they will be providing a box of groceries to each car in line (boxes can contain both shelf stable and refrigerated items) for all neighbors facing food insecurity, while supplies last. Distribution will take place from 1 PM - 2:30 PM at Christ United Methodist Church, located at 3101 Coit Rd. Plano, TX, 75075, in the North parking lot. Enter from the Coit Road entrance to join the car line. Volunteers will be present to direct you, and help you fill out any needed paperwork",
			es: "La Despensa de la Esquina de la Iglesia Christ United Methodist Church está organizando sus eventos del Banco Móvil de Alimentos el primer jueves de cada mes. En asociación con el Banco de Alimentos del Norte de Texas y Caridades Católicas, se proporcionará una caja de comestibles a cada automóvil en la fila (las cajas pueden contener artículos no perecibles y refrigerados) para todos los vecinos que enfrentan necesidad alimentaria, hasta agotar existencias. La distribución se llevará a cabo de 1 PM a 2:30 PM en la Iglesia Christ United Methodist Church, cuya direccion es 3101 Coit Rd. Plano, TX, 75075, en el estacionamiento norte. Ingrese por la entrada de Coit Road para unirse a la línea de autos. Los voluntarios estarán presentes para dirigirlo y ayudarlo a completar cualquier papeleo necesario.",
		},
		updated: "2026-06-17T07:00:00-05:00",
		website: "https://cumc.com/events/corner-pantry/",
	},

	{
		address: "Varies by location",
		hours: {
			en: [],
			es: [],
		},
		idRequired: false,
		name: {
			en: "McKinney Little Free Pantry",
			es: "Pequeña despensa gratuita de McKinney",
		},
		services: {
			en: "Provides provide non-perishable food, toiletries and basic life necessities with respect, love and dignity for shoppers and donors alike. This assistance is available 24 hours a day, 7 days a week with no rules or regulations as to who receives the assistance.",
			es: "Proporciona alimentos no perecederos, artículos de tocador y artículos de primera necesidad con respeto, amor y dignidad tanto para los compradores como para los donantes. Esta asistencia está disponible las 24 horas del día, los 7 días de la semana, sin reglas ni regulaciones sobre quién recibe la asistencia.",
		},
		updated: "2026-04-29T07:00:00-05:00",
		website: "https://www.mckinneylfp.org",
		additionalResources: [
			{
				address: "513 West Heard Street, McKinney, TX 75069",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				map: {
					en: "https://map2me.link/private-residence-6k7o",
					es: "https://map2me.link/residencia-privada-private-residence-tmgs",
				},
				name: {
					en: "Private Residence",
					es: "Residencia Privada",
				},
				updated: "2026-04-29T07:00:00-05:00",
			},
			{
				address: "604 Rike Street, McKinney, TX 75069",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				map: {
					en: "https://map2me.link/church-of-the-nazarene-1xfv",
					es: "https://map2me.link/iglesia-del-nazareno-renovacion-church-o-s6ek",
				},
				name: {
					en: "Church of the Nazarene",
					es: "Iglesia del Nazareno Renovación",
				},
				updated: "2026-04-29T07:00:00-05:00",
			},
			{
				address: "400 North College Street, McKinney, TX 75069",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				map: {
					en: "https://map2me.link/st-peter-s-episcopal-church-parking-lot-7qaj",
					es: "https://map2me.link/st-peter-s-episcopal-church-parking-lot-9w61",
				},
				name: {
					en: "St Peter’s Episcopal Church Parking Lot",
					es: "St Peter’s Episcopal Church Parking Lot",
				},
				updated: "2026-04-29T07:00:00-05:00",
			},
			{
				address: "5871 Virginia Parkway, McKinney, TX 75071",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				map: {
					en: "https://map2me.link/behind-trinity-presbyterian-church-lk2i",
					es: "https://map2me.link/behind-trinity-presbyterian-church-1m0j",
				},
				name: {
					en: "Behind Trinity Presbyterian Church",
					es: "Behind Trinity Presbyterian Church",
				},
				updated: "2026-04-29T07:00:00-05:00",
			},
			{
				address: "614 Blue Ridge Street, McKinney, TX 75072",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				map: {
					en: "https://map2me.link/private-residence-1alr",
					es: "https://map2me.link/residencia-privada-private-residence-8og7",
				},
				name: {
					en: "Private Residence",
					es: "Residencia Privada",
				},
				updated: "2026-04-29T07:00:00-05:00",
			},
			{
				address: "404 Lincoln Street, McKinney, TX 75069",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				map: {
					en: "https://map2me.link/holy-family-episcopal-church-8oit",
					es: "https://map2me.link/iglesia-episcopal-de-la-santa-natividad-1rn0",
				},
				name: {
					en: "Holy Family Episcopal Church",
					es: "Iglesia Episcopal de la Santa Natividad",
				},
				updated: "2026-04-29T07:00:00-05:00",
			},
			{
				address: "110 St. Gabriel Way, McKinney, TX 75071",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				map: {
					en: "https://map2me.link/st-gabriel-the-archangel-church-7h17",
					es: "https://map2me.link/st-gabriel-the-archangel-church-9oex",
				},
				name: {
					en: "St. Gabriel the Archangel Church",
					es: "St. Gabriel the Archangel Church",
				},
				updated: "2026-04-29T07:00:00-05:00",
			},
			{
				address: "6400 McKinney Ranch Parkway, McKinney, TX 75070",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				map: {
					en: "https://map2me.link/st-andrew-s-episcopal-church-vcr5",
					es: "https://map2me.link/st-andrew-s-episcopal-church-t1ht",
				},
				name: {
					en: "St. Andrew’s Episcopal Church",
					es: "St. Andrew’s Episcopal Church",
				},
				updated: "2026-04-29T07:00:00-05:00",
			},
			{
				address: "2000 West White Avenue, McKinney, TX 75069",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				map: {
					en: "https://map2me.link/first-presbyterian-church-vlqe",
					es: "https://map2me.link/first-presbyterian-church-h9we",
				},
				name: {
					en: "First Presbyterian Church",
					es: "First Presbyterian Church",
				},
				updated: "2026-04-29T07:00:00-05:00",
			},
			{
				address: "1811 Ridge Road, McKinney, TX 75071",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				map: {
					en: "https://map2me.link/southeast-backside-of-masonic-temple-q7lt",
					es: "https://map2me.link/se-backside-of-masonic-temple-southeast-44j9",
				},
				name: {
					en: "Southeast backside of Masonic Temple",
					es: "SE backside of Masonic Temple",
				},
				updated: "2026-04-29T07:00:00-05:00",
			},
			{
				address: "1827 West Louisiana Street, McKinney, TX 75069",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				map: {
					en: "https://map2me.link/the-shot-spot-obyf",
					es: "https://map2me.link/the-shot-spot-l0rp",
				},
				name: {
					en: "The Shot Spot",
					es: "The Shot Spot",
				},
				notes: {
					en: "**Pet Pantry Only**",
					es: "**Pet Pantry Only**",
				},
				updated: "2026-04-29T07:00:00-05:00",
			},
		],
	},
];

export default resources;
