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
		address: "501 Howard Street McKinney, TX 75069",
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
		address: "604 Rike Street McKinney, TX 75069",
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
			en: "Renovación",
			es: "Renovación",
		},
		phone: "(214) 944-7260",
		website: "https://mckinneyrenovacion.wixsite.com/renovacion-nazareno",
	},
	{
		address: "901 N. McDonald, Mckinney, TX 75069",
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
		address: "600 Wilson Creek Pkwy, Mckinney 75069",
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
			en: "Salvation Army Collin County",
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
		website: "https://salvationarmyntx.org/north-texas/cure-hunger",
	},
	{
		address: "1601 N. Waddill, Suite 102, Mckinney 75069",
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
				address: "455 Monte Carlo Blvd., Princeton, TX 75407",
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
				address: "401 Erwin, McKinney, TX 75069",
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
				address: "300 Main St in Weston, TX",
				hours: {
					en: ["October 14, 2023 9:00 AM - 11:00 AM"],
					es: ["Octubre 14, 2023 9:00 AM - 11:00 AM"],
				},
				idRequired: false,
				name: {
					en: "First Baptist Church Weston",
					es: "First Baptist Church Weston",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribución móvil de alimentos",
				},
			},
			{
				address: "115 West St in Celina TX",
				hours: {
					en: ["November 11, 2023 9:00 AM - 11:00 AM"],
					es: ["Noviembre 11, 2023 9:00 AM - 11:00 AM"],
				},
				idRequired: false,
				name: {
					en: "Bethel Baptist Church Celina",
					es: "Bethel Baptist Church Celina",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribución móvil de alimentos",
				},
			},
			{
				address: "1800 West Hunt, McKinney, TX 75069",
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
				address: "102 W. Lamar St, McKinney, TX 75069",
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
				address: "6400 McKinney Ranch Pkwy, McKinney, TX 75070",
				hours: {
					en: ["October 28, 2023 9:00 AM - 10:30 AM"],
					es: ["Octubre 28, 2023 9:00 AM - 10:30 AM"],
				},
				idRequired: false,
				name: {
					en: "St. Andrews Episcopal Church",
					es: "St. Andrews Episcopal Church",
				},
				services: {
					en: "Mobile food distribution",
					es: "Distribución móvil de alimentos",
				},
			},
		],
	},
	{
		address: "107 E. Lamar St., McKinney, 75069",
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
		address: "600 Wilson Creek Pkwy, McKinney, 75069",
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
		address: "1711 Parker Road Wylie, 75098",
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
		website: "http://www.AmazingGracePantry.org",
	},
	{
		address: "652 N. Redbud Blvd, Mckinney, 75069",
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
			en: "St. Vincent de Paul",
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
		address: "3107 Hwy 5 (Mckinney St), Melissae, 75454",
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
		address: "801 E. Main St, Allen, 75002",
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
			en: "Allen Community Outreach",
			es: "Allen Community Outreach",
		},
		notes: {
			en: "Proof of Collin County residency is required. For new clients, a QR code will be emailed after completion of a brief application in the drive-thru line. The QR code is required for future visits. Sometimes the need for food is NOW. For those extreme situations ACO’s 801 E. Main Street location stocks a limited number of basic food supplies in our main office. If you are in need of emergency food, call ACO’s office at 972-727-9131.",
			es: "Se requiere prueba de residencia en el condado de Collin. Para los nuevos clientes, se les enviará un código QR por correo electrónico después de completar una breve solicitud en la fila del autoservicio. El código QR es necesario para futuras visitas. A veces la necesidad de comida es AHORA. Para esas situaciones extremas, la ubicación de ACO en 801 E. Main Street almacena una cantidad limitada de suministros de alimentos básicos en nuestra oficina principal. Si necesita alimentos de emergencia, llame a la oficina de ACO al 972-727-9131.",
		},
		phone: "(972)-727-9131",
		services: {
			en: "Food pantry and financial assistance",
			es: "Despensa de alimentos y asistencia financiera",
		},
		website: "https://www.acocares.org/need-help/",
	},
	{
		address: "Hope Fellowship Church, 1702 W University Dr, McKinney, 75069",
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
];

export default resources;
