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
	notes?: {
		en: string;
		es: string;
	};
	phone?: string;
	services?: {
		en: string;
		es: string;
	};
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
		name: {
			en: "Community Garden Kitchen",
			es: "Cocina con Jardín Comunitario",
		},
		services: {
			en: "Free restaurant style meals for your whole family",
			es: "Comidas estilo restaurante gratuitas para toda tu familia.",
		},
		website: "https://communitygardenkitchen.org/",
	},
	{
		address: "604 Rike Street, McKinney, TX 75069",
		hours: {
			en: [
				"2nd Saturday 9:00 AM - 12:00 PM",
				"4th Sunday 11:30 AM - 1:00 PM",
				"Tuesday 9:00 AM - 11:00 AM",
				"Thursday 10:00 AM - 11:00 AM",
			],
			es: [
				"2do sábado 9:00 AM - 12:00 PM",
				"4to domingo 11:30 AM - 1:00 PM",
				"Martes 9:00 AM - 11:00 AM",
				"Jueves 10:00 AM - 11:00 AM",
			],
		},
		idRequired: false,
		name: {
      en: "Church of the Nazarene",
      es: "Iglesia del Nazareno Renovación",
		},
		phone: "(214) 944-7260",
		website: "https://mckinneyrenovacion.wixsite.com/renovacion-nazareno",
	},
	{
		address: "901 North McDonald Street, McKinney, TX 75069",
		hours: {
			en: [
				"Monday 10:00 AM - 4:00 PM",
				"Tuesday 10:00 AM - 4:00 PM",
				"Wednesday 10:00 AM - 4:00 PM",
				"Thursday 10:00 AM - 4:00 PM",
				"Friday 10:00 AM - 4:00 PM",
			],
			es: [
				"Lunes 10:00 AM - 4:00 PM",
				"Martes 10:00 AM - 4:00 PM",
				"Miércoles 10:00 AM - 4:00 PM",
				"Jueves 10:00 AM - 4:00 PM",
				"Viernes 10:00 AM - 4:00 PM",
			],
		},
		idRequired: false,
		name: {
			en: "iRise DFW",
			es: "iRise DFW",
		},
		phone: "(214) 548-4447",
		services: {
			en: "Food Pantry and support for single moms",
			es: "Despensa de alimentos y apoyo para madres solteras",
		},
		website: "https://www.irisedfw.org",
	},
	{
		address: "600 Wilson Creek Parkway, McKinney, TX 75069",
		hours: {
			en: [
				"Monday 9:00 AM - 12:00 PM, 1:00 PM - 3:00 PM",
				"Wednesday 9:00 AM - 12:00 PM, 1:00 PM - 3:00 PM",
				"Thursday 9:00 AM - 12:00 PM, 1:00 PM - 3:00 PM",
				"Friday 9:00 AM - 12:00 PM",
			],
			es: [
				"Lunes 9:00 AM - 12:00 PM, 1:00 PM - 3:00 PM",
				"Miércoles 9:00 AM - 12:00 PM, 1:00 PM - 3:00 PM",
				"Jueves 9:00 AM - 12:00 PM, 1:00 PM - 3:00 PM",
				"Viernes 9:00 AM - 12:00 PM",
			],
		},
		idRequired: true,
		name: {
			en: "The Salvation Army of McKinney",
			es: "Ejército de Salvación Collin County",
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
		website: "https://salvationarmyntx.org/north-texas/mckinney",
	},
	{
		address: "1601 North Waddill Street, Suite 102, McKinney, TX 75069",
		hours: {
			en: [
				"Tuesday 10:00 AM - 3:00 PM",
				"Wednesday 10:00 AM - 3:00 PM",
				"Thursday 10:00 AM - 3:00 PM",
				"Friday 10:00 AM - 3:00 PM",
			],
			es: [
				"Martes 10:00 AM - 3:00 PM",
				"Miércoles 10:00 AM - 3:00 PM",
				"Jueves 10:00 AM - 3:00 PM",
				"Viernes 10:00 AM - 3:00 PM",
			],
		},
		idRequired: true,
		name: {
			en: "Community Lifeline Center",
			es: "Centro Comunitario de Salvavidas",
		},
		notes: {
			en: "Complete online application for financial assistance if qualified.",
			es: "Complete la solicitud en línea para asistencia financiera si califica.",
		},
		phone: "(972) 542-0020",
		services: {
			en: "Food pantry. Financial assistance available to CoServ, TXU, McKinney Water, or Atmos customers.",
			es: "Despensa de alimentos. Asistencia financiera disponible para clientes de CoServ, TXU, McKinney Water o Atmos.",
		},
		website: "https://www.communitylifeline.org/rent--utility-help.html",
		additionalResources: [
			{
				address: "455 Monte Carlo Boulevard, Princeton, TX 75407",
				hours: {
					en: [
						"October 21, 2023 9:00 AM - 11:00 AM",
						"November 4, 2023 9:00 AM - 11:00 AM",
						"November 18, 2023 9:00 AM - 11:00 AM",
						"December 2, 2023 9:00 AM - 11:00 AM",
						"December 16, 2023 9:00 AM - 11:00 AM",
					],
					es: [
						"Octubre 21, 2023 9:00 AM - 11:00 AM",
						"Noviembre 4, 2023 9:00 AM - 11:00 AM",
						"Noviembre 18, 2023 9:00 AM - 11:00 AM",
						"Diciembre 2, 2023 9:00 AM - 11:00 AM",
						"Diciembre 16, 2023 9:00 AM - 11:00 AM",
					],
				},
				idRequired: false,
				name: {
					en: "Southard Middle School",
					es: "Southard Middle School",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribución móvil de alimentos",
				},
			},
			{
				address: "401 West Erwin Avenue, McKinney, TX 75069",
				hours: {
					en: [
						"October 21, 2023 9:00 AM - 11:00 AM",
						"November 18, 2023 9:00 AM - 11:00 AM",
						"December 16, 2023 9:00 AM - 11:00 AM",
					],
					es: [
						"Octubre 21, 2023 9:00 AM - 11:00 AM",
						"Noviembre 4, 2023 9:00 AM - 11:00 AM",
						"Diciembre 16, 2023 9:00 AM - 11:00 AM",
					],
				},
				idRequired: false,
				name: {
					en: "McKinney First Baptist Church",
					es: "McKinney First Baptist Church",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribución móvil de alimentos",
				},
			},
			{
				address: "300 Main Street, Weston, TX 75097",
				hours: {
					en: ["October 14, 2023 9:00 AM - 11:00 AM"],
					es: ["Octubre 14, 2023 9:00 AM - 11:00 AM"],
				},
				idRequired: false,
				name: {
					en: "First Baptist Church of Weston",
					es: "First Baptist Church Weston",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribución móvil de alimentos",
				},
			},
			{
				address: "115 West Street, Celina, TX 75009",
				hours: {
					en: ["November 11, 2023 9:00 AM - 11:00 AM"],
					es: ["Noviembre 11, 2023 9:00 AM - 11:00 AM"],
				},
				idRequired: false,
				name: {
					en: "Bethel Baptist Church Celina (hosted at Calvary Chapel Church)",
					es: "Bethel Baptist Church Celina",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribución móvil de alimentos",
				},
			},
			{
				address: "1800 West Hunt Street, McKinney, TX 75069",
				hours: {
					en: [
						"October 7, 2023 9:00 AM - 10:30 AM",
						"November 4, 2023 9:00 AM - 10:30 AM",
						"December 2, 2023 9:00 AM - 10:30 AM",
					],
					es: [
						"Octubre 7, 2023 9:00 AM - 10:30 AM",
						"Noviembre 4, 2023 9:00 AM - 10:30 AM",
						"Diciembre 2, 2023 9:00 AM - 10:30 AM",
					],
				},
				idRequired: false,
				name: {
					en: "First Christian Church McKinney",
					es: "First Christian Church McKinney",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribución móvil de alimentos",
				},
			},
			{
				address: "102 West Lamar Street, McKinney, TX 75069",
				hours: {
					en: [
						"October 14, 2023 9:30 AM - 10:30 AM",
						"October 28, 2023 9:30 AM - 10:30 AM",
						"November 11, 2023 9:30 AM - 10:30 AM",
						"November 25, 2023 9:30 AM - 10:30 AM",
						"December 9, 2023 9:30 AM - 10:30 AM",
					],
					es: [
						"Octubre 14, 2023 9:30 AM - 10:30 AM",
						"Octubre 28, 2023 9:30 AM - 10:30 AM",
						"Noviembre 11, 2023 9:30 AM - 10:30 AM",
						"Noviembre 25, 2023 9:30 AM - 10:30 AM",
						"Diciembre 9, 2023 9:30 AM - 10:30 AM",
					],
				},
				idRequired: false,
				name: {
					en: "First United Methodist Church",
					es: "First United Methodist Church",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribución móvil de alimentos",
				},
			},
			{
				address: "6400 McKinney Ranch Parkway, McKinney, TX 75070",
				hours: {
					en: ["October 28, 2023 9:00 AM - 10:30 AM"],
					es: ["Octubre 28, 2023 9:00 AM - 10:30 AM"],
				},
				idRequired: false,
				name: {
					en: "St. Andrew's Episcopal Church",
					es: "St. Andrew's Episcopal Church",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribución móvil de alimentos",
				},
			},
		],
	},
	{
		address: "107 East Lamar Street, McKinney, TX 75069",
		hours: {
			en: ["Sunday 4:00 PM"],
			es: ["Domingo 4:00 PM"],
		},
		idRequired: false,
		name: {
			en: "Roadside Church",
			es: "Roadside Church",
		},
		services: {
			en: "Hot meals",
			es: "Hot meals",
		},
	},
	{
		address: "600 Wilson Creek Parkway, McKinney, TX 75069",
		hours: {
			en: ["Sunday 11:45 AM - 1:00 PM"],
			es: ["Domingo 11:45 AM - 1:00 PM"],
		},
		idRequired: false,
		name: {
			en: "The Parks Church",
			es: "The Parks Church",
		},
		services: {
			en: "Produce, canned goods, eggs and meat offered with a hot meal.",
			es: "Productos agrícolas, conservas, huevos y carnes que se ofrecen con una comida caliente.",
		},
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
		name: {
			en: "Amazing Grace Food Pantry",
			es: "Amazing Grace Food Pantry",
		},
		phone: "(972) 292-7241",
		services: {
			en: "Food pantry",
			es: "Despensa de alimentos",
		},
		website: "http://www.amazinggracepantry.org",
	},
	{
		address: "411 Paula Road, McKinney, TX 75069",
		hours: {
			en: [
				"Tuesday 2:00 PM - 4:00 PM",
				"First and Third Thursday 2:00 PM - 4:00 PM",
			],
			es: [
				"Martes 2:00 PM - 4:00 PM",
				"Primer y tercer jueves 2:00 PM - 4:00 PM",
			],
		},
		idRequired: true,
		name: {
			en: "St. Vincent de Paul (hosted at St. Michael the Archangel)",
			es: "St. Vincent de Paul",
		},
		notes: {
			en: "Must bring photo ID and proof of residency (utility bill or similar). once every 4 weeks",
			es: "Debe traer identificación con fotografía y comprobante de residencia (factura de servicios públicos o similar). una vez cada 4 semanas",
		},
		phone: "(214) 973-3435",
		services: {
			en: "Food pantry",
			es: "Despensa de alimentos",
		},
		website: "https://stmichaelmckinney.org/st-vincent-de-paul-",
	},
	{
		address: "3107 Highway 5 (McKinney Street), Melissa, TX 75454",
		email: "Dena@project.org",
		hours: {
			en: ["Monday 5:00 PM - 6:30 PM", "Thursday 5:00 PM - 6:30 PM"],
			es: ["Lunes 5:00 PM - 6:30 PM", "Jueves 5:00 PM - 6:30 PM"],
		},
		idRequired: false,
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
		website: "https://25project.org",
	},
	{
		address: "801 East Main Street, Allen, TX 75002",
		hours: {
			en: [
				"Tuesday 9:00 AM - 11:00 AM, 5:00 PM - 7:00 PM",
				"Thursday 9:00 AM - 11:00 AM",
				"Saturday 9:00 AM - 11:00 AM",
			],
			es: ["Lunes 5:00 PM - 6:30 PM", "Jueves 5:00 PM - 6:30 PM"],
		},
		idRequired: true,
		name: {
			en: "All Community Outreach",
			es: "All Community Outreach",
		},
		notes: {
			en: "Proof of Collin County residency is required. For new clients, a QR code will be emailed after completion of a brief application in the drive-thru line. The QR code is required for future visits. Sometimes the need for food is NOW. For those extreme situations ACO’s 801 E. Main Street location stocks a limited number of basic food supplies in our main office. If you are in need of emergency food, call ACO’s office at 972-727-9131.",
			es: "Se requiere prueba de residencia en el condado de Collin. Para los nuevos clientes, se les enviará un código QR por correo electrónico después de completar una breve solicitud en la fila del autoservicio. El código QR es necesario para futuras visitas. A veces la necesidad de comida es AHORA. Para esas situaciones extremas, la ubicación de ACO en 801 E. Main Street almacena una cantidad limitada de suministros de alimentos básicos en nuestra oficina principal. Si necesita alimentos de emergencia, llame a la oficina de ACO al 972-727-9131.",
		},
		phone: "(972) 727-9131",
		services: {
			en: "Food pantry and financial assistance",
			es: "Despensa de alimentos y asistencia financiera",
		},
		website: "https://www.acocares.org/need-help/",
	},
	{
		address: "Hope Fellowship Church, 1702 West University Drive, McKinney, TX 75069",
		email: "hhkhut33@gmail.com",
		hours: {
			en: ["Second Saturday Mornings"],
			es: ["Segundo sábado por la mañana"],
		},
		idRequired: true,
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
		website: "https://babybootiesdiaperbank.org/get-help/",
	},
	{
		address: "Varies by location",
		hours: {
			en: ["Second Saturday Mornings"],
			es: ["Segundo sábado por la mañana"],
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
		website: "https://www.mckinneylfp.org",
		additionalResources: [
			{
				address: "110 Davis Street, McKinney, TX 75069",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				name: {
					en: "McKinney Little Free Pantry (located on Tennessee Street side)",
					es: "Pequeña despensa gratuita de McKinney",
				},
			},
			{
				address: "502 North Kentucky Street, McKinney, TX 75069",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				name: {
					en: "McKinney Art House",
					es: "La Casa del Arte",
				},
			},
			{
				address: "513 West Heard Street, McKinney, TX 75069",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				name: {
					en: "Private Residence",
					es: "Residencia Privada",
				},
			},
			{
				address: "604 Rike Street, McKinney, TX 75069",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				name: {
					en: "Church of the Nazarene",
					es: "Iglesia del Nazareno Renovación",
				},
			},
			{
				address: "400 North College Street, McKinney, TX 75069",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				name: {
					en: "St Peter’s Episcopal Church Parking Lot",
					es: "St Peter’s Episcopal Church Parking Lot",
				},
			},
			{
				address: "5871 Virginia Parkway, McKinney, TX 75071",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				name: {
					en: "Behind Trinity Presbyterian Church",
					es: "Behind Trinity Presbyterian Church",
				},
			},
			{
				address: "614 Blue Ridge Street, McKinney, TX 75072",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				name: {
					en: "Private Residence",
					es: "Residencia Privada",
				},
			},
			{
				address: "404 Lincoln Street, Plano, TX 75069",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				name: {
					en: "Holy Family Episcopal Church",
					es: "Iglesia Episcopal de la Santa Natividad",
				},
			},
			{
				address: "110 St. Gabriel Way, McKinney, TX 75071",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				name: {
					en: "St. Gabriel the Archangel Church",
					es: "St. Gabriel the Archangel Church",
				},
			},
			{
				address: "6400 McKinney Ranch Parkway, McKinney, TX 75070",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				name: {
					en: "St. Andrew’s Episcopal Church",
					es: "St. Andrew’s Episcopal Church",
				},
			},
			{
				address: "2000 West White Avenue, McKinney, TX 75069",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				name: {
					en: "First Presbyterian Church",
					es: "First Presbyterian Church",
				},
			},
			{
				address: "1811 Ridge Road, McKinney, TX 75071",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				name: {
					en: "Southeast backside of Masonic Temple",
					es: "SE backside of Masonic Temple",
				},
			},
			{
				address: "1827 West Louisiana Street, McKinney, TX 75069",
				hours: {
					en: ["All day, everyday"],
					es: ["Todo el día todos los días"],
				},
				idRequired: false,
				name: {
					en: "The Shot Spot",
					es: "The Shot Spot",
				},
				notes: {
					en: "**Pet Pantry Only**",
					es: "**Pet Pantry Only**",
				},
			},
		],
	},
];

export default resources;
