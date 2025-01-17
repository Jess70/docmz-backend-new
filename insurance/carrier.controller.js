const db = require("_helpers/db"),
  express = require("express"),
  app = express(),
  request = require("request"),
  Plan = db.Plans,
  Carrier = db.Carriers;

let carriers = [
  [440, "1199SEIU", 2, 0, 1, 0],
  [1520, "1st Agency", 2, 0, 1, 0],
  [876, "20/20 Eyecare Plan", 2, 0, 1, 0],
  [290, "AARP", 2, 0, 1, 0],
  [1239, "Absolute Total Care", 2, 0, 1, 0],
  [1215, "Access Medicare (NY)", 2, 0, 1, 0],
  [526, "Accountable Health Plan of Ohio", 2, 0, 1, 0],
  [480, "ACE", 2, 0, 1, 0],
  [1354, "AdvantageMD", 2, 0, 1, 0],
  [771, "Advantica", 2, 0, 1, 0],
  [882, "Advent Health", 2, 0, 1, 0],
  [533, "Adventist Health", 2, 0, 1, 0],
  [1060, "Advocate Health Care", 2, 0, 1, 0],
  [300, "Aetna", 2, 0, 1, 0],
  [1298, "Aetna Better Health", 2, 0, 1, 0],
  [340, "Affinity Health Plan", 2, 0, 1, 0],
  [1291, "AgeWell New York", 2, 0, 1, 0],
  [1324, "Agile Health Insurance", 2, 0, 1, 0],
  [291, "AIG", 2, 0, 1, 0],
  [877, "Alameda Alliance for Health", 2, 0, 1, 0],
  [1433, "Alignment Health Plan", 2, 0, 1, 0],
  [1314, "All Savers Insurance", 2, 0, 1, 0],
  [1474, "AllCare Health", 2, 0, 1, 0],
  [1085, "Allegiance Life and Health", 2, 0, 1, 0],
  [1084, "Alliant Health Plans", 2, 0, 1, 0],
  [1311, "Allianz Worldwide Care", 2, 0, 1, 0],
  [1544, "AllWays Health Partners", 2, 0, 1, 0],
  [1471, "Allwell", 2, 0, 1, 0],
  [1173, "AlohaCare", 2, 0, 1, 0],
  [1290, "AlphaCare", 2, 0, 1, 0],
  [957, "AltaMed Senior BuenaCare (PACE)", 2, 0, 1, 0],
  [325, "Altius (Coventry Health Care)", 2, 0, 1, 0],
  [708, "AlwaysCare", 2, 0, 1, 0],
  [1323, "Ambetter", 2, 0, 1, 0],
  [1228, "American Behavioral", 2, 0, 1, 0],
  [1054, "American Eldercare", 2, 0, 1, 0],
  [1431, "American Healthcare Alliance", 2, 0, 1, 0],
  [1521, "American Maritime Officers Plans", 2, 0, 1, 0],
  [711, "American Republic Insurance Company", 2, 0, 1, 0],
  [909, "America's 1st Choice", 2, 0, 1, 0],
  [388, "AmeriGroup", 2, 0, 1, 0],
  [326, "AmeriHealth", 2, 0, 1, 0],
  [622, "AmeriHealth Caritas", 2, 0, 1, 0],
  [976, "Amida Care", 2, 0, 1, 0],
  [1363, "Amish Church Fund", 2, 0, 1, 0],
  [991, "Amplifon Hearing Health Care", 2, 0, 1, 0],
  [550, "Anthem Blue Cross", 2, 0, 1, 0],
  [324, "Anthem Blue Cross Blue Shield", 2, 0, 1, 0],
  [391, "APWU", 2, 0, 1, 0],
  [1426, "ArchCare", 2, 0, 1, 0],
  [1160, "Arise Health Plan", 2, 0, 1, 0],
  [1545, "Arizona Complete Health", 2, 0, 1, 0],
  [678, "Arizona Foundation for Medical Care", 2, 0, 1, 0],
  [1010, "Arkansas Blue Cross Blue Shield", 2, 0, 1, 0],
  [816, "Ascension Health", 2, 0, 1, 0],
  [1053, "Assurant Employee Benefits", 2, 0, 1, 0],
  [335, "Assurant Health", 2, 0, 1, 0],
  [716, "Asuris Northwest Health", 2, 0, 1, 0],
  [926, "ATRIO Health Plans", 2, 0, 1, 0],
  [1130, "Aultcare", 2, 0, 1, 0],
  [1195, "Avera Health Plans", 2, 0, 1, 0],
  [549, "Avesis", 2, 0, 1, 0],
  [1522, "AVMA Life", 2, 0, 1, 0],
  [560, "AvMed", 2, 0, 1, 0],
  [1352, "Banker's Life", 2, 0, 1, 0],
  [717, "Banner Health", 2, 0, 1, 0],
  [1318, "Baptist Health Plan", 2, 0, 1, 0],
  [519, "Beacon Health Options", 2, 0, 1, 0],
  [720, "Beaumont Employee Health Plan", 2, 0, 1, 0],
  [303, "Beech Street", 2, 0, 1, 0],
  [721, "Best Choice Plus", 2, 0, 1, 0],
  [1483, "Best Doctors Insurance", 2, 0, 1, 0],
  [993, "Best Life And Health", 2, 0, 1, 0],
  [879, "Better Health (Florida Medicaid)", 2, 0, 1, 0],
  [525, "Block Vision", 2, 0, 1, 0],
  [1109, "Blue Choice Health Plan", 2, 0, 1, 0],
  [545, "Blue Cross Blue Shield Federal Employee Program", 2, 0, 1, 0],
  [793, "Blue Cross Blue Shield of Alabama", 2, 0, 1, 0],
  [572, "Blue Cross Blue Shield of Arizona", 2, 0, 1, 0],
  [568, "Blue Cross Blue Shield of Georgia", 2, 0, 1, 0],
  [451, "Blue Cross Blue Shield of Illinois", 2, 0, 1, 0],
  [810, "Blue Cross Blue Shield of Kansas", 2, 0, 1, 0],
  [726, "Blue Cross Blue Shield of Kansas City", 2, 0, 1, 0],
  [853, "Blue Cross Blue Shield of Louisiana", 2, 0, 1, 0],
  [573, "Blue Cross Blue Shield of Massachusetts", 2, 0, 1, 0],
  [676, "Blue Cross Blue Shield of Michigan", 2, 0, 1, 0],
  [698, "Blue Cross Blue Shield of Minnesota", 2, 0, 1, 0],
  [758, "Blue Cross Blue Shield of Mississippi", 2, 0, 1, 0],
  [1207, "Blue Cross Blue Shield of Montana", 2, 0, 1, 0],
  [756, "Blue Cross Blue Shield of Nebraska", 2, 0, 1, 0],
  [1096, "Blue Cross Blue Shield of New Mexico", 2, 0, 1, 0],
  [791, "Blue Cross Blue Shield of North Carolina", 2, 0, 1, 0],
  [1201, "Blue Cross Blue Shield of North Dakota", 2, 0, 1, 0],
  [854, "Blue Cross Blue Shield of Oklahoma", 2, 0, 1, 0],
  [724, "Blue Cross Blue Shield of Rhode Island", 2, 0, 1, 0],
  [797, "Blue Cross Blue Shield of South Carolina", 2, 0, 1, 0],
  [828, "Blue Cross Blue Shield of Tennessee", 2, 0, 1, 0],
  [509, "Blue Cross Blue Shield of Texas", 2, 0, 1, 0],
  [996, "Blue Cross Blue Shield of Vermont", 2, 0, 1, 0],
  [997, "Blue Cross Blue Shield of Western New York", 2, 0, 1, 0],
  [1073, "Blue Cross Blue Shield of Wyoming", 2, 0, 1, 0],
  [1094, "Blue Cross of Idaho", 2, 0, 1, 0],
  [808, "Blue Cross of Northeastern Pennsylvania", 2, 0, 1, 0],
  [438, "Blue Shield of California", 2, 0, 1, 0],
  [999, "Blue Shield of Northeastern New York", 2, 0, 1, 0],
  [680, "BMC HealthNet Plan", 2, 0, 1, 0],
  [944, "Brand New Day", 2, 0, 1, 0],
  [1115, "BridgeSpan", 2, 0, 1, 0],
  [579, "Bridgeway Health Solutions", 2, 0, 1, 0],
  [1423, "Bright Health", 2, 0, 1, 0],
  [1131, "Buckeye Health Plan", 2, 0, 1, 0],
  [1513, "California Foundation for Medical Care", 2, 0, 1, 0],
  [1241, "California Health and Wellness", 2, 0, 1, 0],
  [929, "CalOptima", 2, 0, 1, 0],
  [989, "CalPERS", 2, 0, 1, 0],
  [1289, "CalViva Health", 2, 0, 1, 0],
  [1535, "Calvos", 2, 0, 1, 0],
  [1540, "Cambridge Health Alliance (CHA)", 2, 0, 1, 0],
  [1492, "Canal Insurance Company", 2, 0, 1, 0],
  [566, "Capital Blue Cross", 2, 0, 1, 0],
  [908, "Capital Health Plan", 2, 0, 1, 0],
  [728, "Care Access Health Plan", 2, 0, 1, 0],
  [527, "Care Improvement Plus", 2, 0, 1, 0],
  [1030, "Care N' Care", 2, 0, 1, 0],
  [581, "Care1st", 2, 0, 1, 0],
  [1358, "CareConnect", 2, 0, 1, 0],
  [305, "CareFirst Blue Cross Blue Shield", 2, 0, 1, 0],
  [605, "CareMore", 2, 0, 1, 0],
  [807, "CareOregon", 2, 0, 1, 0],
  [341, "CarePlus Health Plans (Florida Medicare)", 2, 0, 1, 0],
  [1213, "CarePoint Health Plans", 2, 0, 1, 0],
  [1078, "CareSource", 2, 0, 1, 0],
  [925, "Cascade Health Alliance", 2, 0, 1, 0],
  [1491, "CastlePoint", 2, 0, 1, 0],
  [457, "Caterpillar", 2, 0, 1, 0],
  [1017, "CBA Blue", 2, 0, 1, 0],
  [352, "CDPHP", 2, 0, 1, 0],
  [633, "CeltiCare Health Plan", 2, 0, 1, 0],
  [930, "CenCal Health", 2, 0, 1, 0],
  [1364, "Cenpatico", 2, 0, 1, 0],
  [1454, "Centennial Care", 2, 0, 1, 0],
  [729, "CenterLight Healthcare", 2, 0, 1, 0],
  [1449, "Centers for Medicare & Medicaid Services", 2, 0, 1, 0],
  [1480, "Centers Plan for Healthy Living", 2, 0, 1, 0],
  [932, "Central California Alliance for Health", 2, 0, 1, 0],
  [933, "Central Health Plan of California", 2, 0, 1, 0],
  [1493, "Central Mutual Insurance Company", 2, 0, 1, 0],
  [1356, "Century Healthcare - CHC", 2, 0, 1, 0],
  [730, "CHAMPVA", 2, 0, 1, 0],
  [1163, "Children's Community Health Plan", 2, 0, 1, 0],
  [880, "Children's Medical Services (CMS)", 2, 0, 1, 0],
  [420, "Chinese Community Health Plan", 2, 0, 1, 0],
  [394, "Choice Care Network", 2, 0, 1, 0],
  [1087, "CHP Group", 2, 0, 1, 0],
  [1366, "Christian Healthcare Ministries", 2, 0, 1, 0],
  [1303, "CHRISTUS Health Plan", 2, 0, 1, 0],
  [1490, "CHUBB", 2, 0, 1, 0],
  [307, "Cigna", 2, 0, 1, 0],
  [510, "Cigna-HealthSpring", 2, 0, 1, 0],
  [1494, "Citizens United Reciprocal Exchange (CURE)", 2, 0, 1, 0],
  [1304, "Clark County Self-Funded Health", 2, 0, 1, 0],
  [546, "Clements Worldwide", 2, 0, 1, 0],
  [1300, "Cleveland Clinic Employee Health Plan", 2, 0, 1, 0],
  [1306, "Clover Health", 2, 0, 1, 0],
  [679, "Cofinity", 2, 0, 1, 0],
  [1083, "Colorado Access", 2, 0, 1, 0],
  [1052, "Columbia United Providers", 2, 0, 1, 0],
  [1292, "Common Ground Healthcare Cooperative", 2, 0, 1, 0],
  [667, "Commonwealth Care", 2, 0, 1, 0],
  [1297, "Commonwealth Care Alliance", 2, 0, 1, 0],
  [1346, "Community Behavioral Health", 2, 0, 1, 0],
  [1424, "Community Care Alliance of Illinois", 2, 0, 1, 0],
  [1537, "Community Care Associates", 2, 0, 1, 0],
  [1223, "Community Care Behavioral Health Organization", 2, 0, 1, 0],
  [831, "Community Care of North Carolina", 2, 0, 1, 0],
  [1566, "Community Care Plan", 2, 0, 1, 0],
  [1058, "Community Eye Care", 2, 0, 1, 0],
  [512, "Community First Health Plans", 2, 0, 1, 0],
  [513, "Community Health Choice", 2, 0, 1, 0],
  [935, "Community Health Group", 2, 0, 1, 0],
  [1266, "Community Health Options", 2, 0, 1, 0],
  [647, "Community Health Partners", 2, 0, 1, 0],
  [677, "Community Health Plan of Washington", 2, 0, 1, 0],
  [1105, "CommunityCare of Oklahoma", 2, 0, 1, 0],
  [1444, "Companion Life", 2, 0, 1, 0],
  [661, "CompBenefits", 2, 0, 1, 0],
  [466, "Comprehensive Health Insurance Plan (CHIP) of Illinois", 2, 0, 1, 0],
  [556, "Comprehensive Medical and Dental Program (CMDP)", 2, 0, 1, 0],
  [532, "ComPsych", 2, 0, 1, 0],
  [1180, "Connect Care", 2, 0, 1, 0],
  [329, "ConnectiCare", 2, 0, 1, 0],
  [536, "Consolidated Health Plans", 2, 0, 1, 0],
  [1519, "Constitution Life", 2, 0, 1, 0],
  [395, "Consumer Health Network", 2, 0, 1, 0],
  [1495, "Continental Casualty Company", 2, 0, 1, 0],
  [937, "Contra Costa Health Plan", 2, 0, 1, 0],
  [973, "Cook Children's Health Plan", 2, 0, 1, 0],
  [1067, "Coordinated Care Health", 2, 0, 1, 0],
  [396, "Corvel", 2, 0, 1, 0],
  [1200, "CountyCare (Cook County)", 2, 0, 1, 0],
  [369, "Coventry Health Care", 2, 0, 1, 0],
  [736, "Cox HealthPlans", 2, 0, 1, 0],
  [1464, "Create", 2, 0, 1, 0],
  [1310, "Crystal Run Health Plans", 2, 0, 1, 0],
  [753, "Culinary Health Fund", 2, 0, 1, 0],
  [901, "DAKOTACARE", 2, 0, 1, 0],
  [538, "Davis Vision", 2, 0, 1, 0],
  [1072, "DC Medicaid", 2, 0, 1, 0],
  [1159, "Dean Health Plan", 2, 0, 1, 0],
  [1316, "Denver Health Medical Plan", 2, 0, 1, 0],
  [1415, "Department of Medical Assistance Services", 2, 0, 1, 0],
  [899, "Deseret Mutual", 2, 0, 1, 0],
  [397, "Devon Health Services", 2, 0, 1, 0],
  [1547, "Devoted Health", 2, 0, 1, 0],
  [1523, "Dimension Health", 2, 0, 1, 0],
  [738, "DMC Care", 2, 0, 1, 0],
  [924, "DOCS (Doctors of the Oregon South Coast)", 2, 0, 1, 0],
  [1185, "Driscoll Health Plan", 2, 0, 1, 0],
  [938, "Easy Choice Health Plan (California)", 2, 0, 1, 0],
  [693, "Easy Choice Health Plan of New York", 2, 0, 1, 0],
  [1468, "EHP Significa", 2, 0, 1, 0],
  [1184, "El Paso First Health Plans", 2, 0, 1, 0],
  [435, "Elderplan", 2, 0, 1, 0],
  [349, "EmblemHealth", 2, 0, 1, 0],
  [338, "EmblemHealth (formerly known as GHI)", 2, 0, 1, 0],
  [337, "EmblemHealth (formerly known as HIP)", 2, 0, 1, 0],
  [1143, "EMI Health", 2, 0, 1, 0],
  [336, "Empire Blue Cross Blue Shield", 2, 0, 1, 0],
  [1355, "Empire BlueCross BlueShield HealthPlus", 2, 0, 1, 0],
  [354, "Empire Plan", 2, 0, 1, 0],
  [459, "Encore Health Network", 2, 0, 1, 0],
  [1056, "Envolve Benefit Options", 2, 0, 1, 0],
  [1456, "Eon Health", 2, 0, 1, 0],
  [1086, "Epic Hearing Health Care", 2, 0, 1, 0],
  [1429, "Erickson Advantage", 2, 0, 1, 0],
  [504, "ESSENCE Healthcare", 2, 0, 1, 0],
  [1482, "Esurance", 2, 0, 1, 0],
  [1466, "EverCare", 2, 0, 1, 0],
  [1134, "Evergreen Health Cooperative", 2, 0, 1, 0],
  [596, "Evolutions Healthcare Systems", 2, 0, 1, 0],
  [557, "Excellus Blue Cross Blue Shield", 2, 0, 1, 0],
  [1538, "Extended Managed Long Term Care", 2, 0, 1, 0],
  [539, "EyeMed", 2, 0, 1, 0],
  [1059, "Eyetopia Vision Care", 2, 0, 1, 0],
  [618, "Fallon Community Health Plan (FCHP)", 2, 0, 1, 0],
  [740, "Family Health Network", 2, 0, 1, 0],
  [806, "FamilyCare Health Plans", 2, 0, 1, 0],
  [343, "Fidelis Care (NY)", 2, 0, 1, 0],
  [1496, "Fidelity", 2, 0, 1, 0],
  [662, "First Choice Health", 2, 0, 1, 0],
  [1286, "First Choice Health Plan of Mississippi", 2, 0, 1, 0],
  [309, "First Health (Coventry Health Care)", 2, 0, 1, 0],
  [745, "FirstCare Health Plans", 2, 0, 1, 0],
  [788, "FirstCarolinaCare", 2, 0, 1, 0],
  [638, "Florida Blue: Blue Cross Blue Shield of Florida", 2, 0, 1, 0],
  [1561, "Florida Community Care", 2, 0, 1, 0],
  [911, "Florida Health Care Plans", 2, 0, 1, 0],
  [1014, "Florida Health Partners", 2, 0, 1, 0],
  [1034, "Florida Hospital Healthcare System (FHHS)", 2, 0, 1, 0],
  [646, "Florida KidCare", 2, 0, 1, 0],
  [1063, "Fort Bend County Indigent Health Care", 2, 0, 1, 0],
  [555, "Fortified Provider Network", 2, 0, 1, 0],
  [692, "Freedom Health", 2, 0, 1, 0],
  [1512, "Fresenius Health Plans", 2, 0, 1, 0],
  [1543, "Friday Health Plans", 2, 0, 1, 0],
  [400, "Galaxy Health", 2, 0, 1, 0],
  [631, "Gateway Health", 2, 0, 1, 0],
  [310, "GEHA", 2, 0, 1, 0],
  [904, "Geisinger Health Plan", 2, 0, 1, 0],
  [941, "GEMCare Health Plan", 2, 0, 1, 0],
  [1032, "General Vision Services (GVS)", 2, 0, 1, 0],
  [1025, "GeoBlue", 2, 0, 1, 0],
  [768, "Gilsbar 360 Alliance", 2, 0, 1, 0],
  [963, "Global Health", 2, 0, 1, 0],
  [1301, "Gold Coast Health Plan", 2, 0, 1, 0],
  [311, "Golden Rule", 2, 0, 1, 0],
  [849, "Golden State Medicare Health Plan", 2, 0, 1, 0],
  [1497, "Great American Insurance", 2, 0, 1, 0],
  [671, "Group Health Cooperative", 2, 0, 1, 0],
  [1172, "Group Health Cooperative of Eau Claire", 2, 0, 1, 0],
  [1162, "Group Health Cooperative of South Central Wisconsin", 2, 0, 1, 0],
  [312, "Guardian", 2, 0, 1, 0],
  [1171, "Gundersen Health Plan", 2, 0, 1, 0],
  [313, "GWH-Cigna (formerly Great West Healthcare)", 2, 0, 1, 0],
  [482, "Hanover Insurance", 2, 0, 1, 0],
  [301, "HAP (Health Alliance Plan)", 2, 0, 1, 0],
  [1055, "HAP Midwest Health Plan", 2, 0, 1, 0],
  [1326, "Harken Health", 2, 0, 1, 0],
  [470, "Harmony Health Plan", 2, 0, 1, 0],
  [615, "Harvard Pilgrim Health Care", 2, 0, 1, 0],
  [1206, "Hawaii Medical Assurance Association (HMAA)", 2, 0, 1, 0],
  [1198, "Hawaii Medical Service Association (HMSA)", 2, 0, 1, 0],
  [1122, "Health Alliance", 2, 0, 1, 0],
  [586, "Health Choice", 2, 0, 1, 0],
  [1210, "Health Choice Utah", 2, 0, 1, 0],
  [1322, "Health First (FL)", 2, 0, 1, 0],
  [1453, "Health First Colorado", 2, 0, 1, 0],
  [910, "Health First Health Plans (Florida)", 2, 0, 1, 0],
  [295, "Health Net", 2, 0, 1, 0],
  [628, "Health New England", 2, 0, 1, 0],
  [1362, "Health Partners Plans (Pennsylvania)", 2, 0, 1, 0],
  [761, "Health Plan of Nevada", 2, 0, 1, 0],
  [942, "Health Plan of San Joaquin", 2, 0, 1, 0],
  [943, "Health Plan of San Mateo", 2, 0, 1, 0],
  [429, "Health Plus", 2, 0, 1, 0],
  [858, "Health Sun", 2, 0, 1, 0],
  [1469, "Healthcare Highways Health Plan", 2, 0, 1, 0],
  [1106, "HealthChoice Oklahoma", 2, 0, 1, 0],
  [366, "HealthFirst (NY)", 2, 0, 1, 0],
  [461, "Healthlink", 2, 0, 1, 0],
  [1111, "HealthNow", 2, 0, 1, 0],
  [570, "HealthPartners", 2, 0, 1, 0],
  [1169, "HealthPlus of Michigan", 2, 0, 1, 0],
  [1435, "HealthScope Benefits", 2, 0, 1, 0],
  [452, "HealthSmart", 2, 0, 1, 0],
  [1139, "HealthyCT", 2, 0, 1, 0],
  [990, "Hear In America", 2, 0, 1, 0],
  [961, "Heritage Vision Plans", 2, 0, 1, 0],
  [454, "HFN", 2, 0, 1, 0],
  [503, "HFS Medical Benefits", 2, 0, 1, 0],
  [564, "Highmark Blue Cross Blue Shield", 2, 0, 1, 0],
  [640, "Highmark Blue Cross Blue Shield of Delaware", 2, 0, 1, 0],
  [565, "Highmark Blue Shield", 2, 0, 1, 0],
  [1153, "Highmark BlueCross BlueShield of West Virginia", 2, 0, 1, 0],
  [1212, "Hillsborough Health Care Plan", 2, 0, 1, 0],
  [1226, "Home State Health Plan", 2, 0, 1, 0],
  [713, "Hometown Health", 2, 0, 1, 0],
  [314, "Horizon Blue Cross Blue Shield of New Jersey", 2, 0, 1, 0],
  [
    1413,
    "Horizon Blue Cross Blue Shield of New Jersey For Barbanas Health",
    2,
    0,
    1,
    0
  ],
  [
    1412,
    "Horizon Blue Cross Blue Shield of New Jersey For Novartis",
    2,
    0,
    1,
    0
  ],
  [673, "Horizon NJ Health", 2, 0, 1, 0],
  [351, "Hudson Health Plan", 2, 0, 1, 0],
  [315, "Humana", 2, 0, 1, 0],
  [1002, "Humana Behavioral Health (LifeSynch)", 2, 0, 1, 0],
  [972, "HUSKY Health", 2, 0, 1, 0],
  [1452, "IHC Health Solutions", 2, 0, 1, 0],
  [632, "Illinicare Health", 2, 0, 1, 0],
  [1517, "Illinois' Primary Care Case Management (PCCM)", 2, 0, 1, 0],
  [1375, "Imagine Health", 2, 0, 1, 0],
  [1532, "Imperial Health Plan of California", 2, 0, 1, 0],
  [529, "IMS (Independent Medical Systems)", 2, 0, 1, 0],
  [563, "Independence Blue Cross", 2, 0, 1, 0],
  [1099, "Independence Care System", 2, 0, 1, 0],
  [403, "Independent Health", 2, 0, 1, 0],
  [1419, "Indiana Medicaid", 2, 0, 1, 0],
  [1359, "Ingham Health Plan", 2, 0, 1, 0],
  [946, "Inland Empire Health Plan", 2, 0, 1, 0],
  [1142, "Innovation Health", 2, 0, 1, 0],
  [1340, "Integra", 2, 0, 1, 0],
  [947, "Inter Valley Health Plan", 2, 0, 1, 0],
  [1467, "Intergroup Services", 2, 0, 1, 0],
  [1199, "INTotal Health", 2, 0, 1, 0],
  [1189, "Iowa MediPASS", 2, 0, 1, 0],
  [1257, "Itasca Medical Care", 2, 0, 1, 0],
  [1328, "IU Health Plans (Indiana University Health)", 2, 0, 1, 0],
  [1531, "Jackson Health Plan", 2, 0, 1, 0],
  [1562, "Jai Medical Systems", 2, 0, 1, 0],
  [624, "Johns Hopkins Employer Health Programs", 2, 0, 1, 0],
  [385, "Kaiser Permanente", 2, 0, 1, 0],
  [741, "Kansas HealthWave", 2, 0, 1, 0],
  [1472, "Kansas Superior Select", 2, 0, 1, 0],
  [1186, "KelseyCare Advantage", 2, 0, 1, 0],
  [569, "Keystone First", 2, 0, 1, 0],
  [773, "KPS Health Plans", 2, 0, 1, 0],
  [949, "L.A. Care Health Plan", 2, 0, 1, 0],
  [1530, "L.A. Care Health Plan", 2, 0, 1, 0],
  [1128, "Land of Lincoln Health", 2, 0, 1, 0],
  [1227, "Landmark Healthplan", 2, 0, 1, 0],
  [1397, "Legacy Health", 2, 0, 1, 0],
  [1539, "Lehigh Valley Health Network Health Plan", 2, 0, 1, 0],
  [1524, "Leon Medical Centers Health Plans", 2, 0, 1, 0],
  [427, "Liberty Health Advantage", 2, 0, 1, 0],
  [484, "Liberty Mutual", 2, 0, 1, 0],
  [659, "LifeWise", 2, 0, 1, 0],
  [1339, "Lighthouse Guild", 2, 0, 1, 0],
  [1563, "Lighthouse Health Plan", 2, 0, 1, 0],
  [1066, "Lincoln Financial Group", 2, 0, 1, 0],
  [1244, "Louisiana Healthcare Connections", 2, 0, 1, 0],
  [465, "Lutheran Preferred", 2, 0, 1, 0],
  [592, "Magellan Health", 2, 0, 1, 0],
  [339, "MagnaCare", 2, 0, 1, 0],
  [1245, "Magnolia Health Plan", 2, 0, 1, 0],
  [445, "Mail Handlers Benefit Plan", 2, 0, 1, 0],
  [1192, "MaineCare", 2, 0, 1, 0],
  [558, "Managed Health Network (MHN)", 2, 0, 1, 0],
  [1246, "Managed Health Services (Indiana)", 2, 0, 1, 0],
  [1247, "Managed Health Services (Wisconsin)", 2, 0, 1, 0],
  [1437, "Managed HealthCare Northwest", 2, 0, 1, 0],
  [774, "March Vision Care", 2, 0, 1, 0],
  [584, "Maricopa Health Plan", 2, 0, 1, 0],
  [1268, "Martin's Point HealthCare", 2, 0, 1, 0],
  [642, "Maryland Medical Assistance (Medicaid)", 2, 0, 1, 0],
  [559, "Maryland Physicians Care", 2, 0, 1, 0],
  [1541, "Massachusetts Laborers’ Health & Welfare Fund", 2, 0, 1, 0],
  [669, "MassHealth", 2, 0, 1, 0],
  [1102, "Mayo Medical Plan", 2, 0, 1, 0],
  [1135, "McLaren Health Plan", 2, 0, 1, 0],
  [1003, "MCM Maxcare", 2, 0, 1, 0],
  [1114, "MDwise", 2, 0, 1, 0],
  [704, "Medica", 2, 0, 1, 0],
  [664, "Medica HealthCare Plans (Florida)", 2, 0, 1, 0],
  [358, "Medicaid", 2, 0, 1, 0],
  [450, "Medi-Cal", 2, 0, 1, 0],
  [683, "Medical Eye Services (MES Vision)", 2, 0, 1, 0],
  [600, "Medical Mutual", 2, 0, 1, 0],
  [356, "Medicare", 2, 0, 1, 0],
  [1068, "MediGold", 2, 0, 1, 0],
  [966, "MediPass", 2, 0, 1, 0],
  [775, "MedStar Family Choice", 2, 0, 1, 0],
  [1231, "MedStar Medicare Choice", 2, 0, 1, 0],
  [1230, "MedStar Select", 2, 0, 1, 0],
  [779, "Memorial Hermann", 2, 0, 1, 0],
  [578, "Mercy Care", 2, 0, 1, 0],
  [965, "Meridian Health Plan", 2, 0, 1, 0],
  [1488, "Meritain Health", 2, 0, 1, 0],
  [883, "MetLife", 2, 0, 1, 0],
  [1447, "MetroHealth", 2, 0, 1, 0],
  [409, "MetroPlus Health Plan", 2, 0, 1, 0],
  [850, "Metropolitan Health Plan", 2, 0, 1, 0],
  [1061, "MHNet Behavioral Health", 2, 0, 1, 0],
  [1549, "Miami Children's Health Plan", 2, 0, 1, 0],
  [1516, "Michigan Complete Health", 2, 0, 1, 0],
  [1262, "Minuteman Health", 2, 0, 1, 0],
  [1399, "Mississippi Division of Medicaid", 2, 0, 1, 0],
  [780, "Missouri Care", 2, 0, 1, 0],
  [1031, "MO HealthNet", 2, 0, 1, 0],
  [1533, "MOAA (Miltary Officers Association of America)", 2, 0, 1, 0],
  [706, "Moda Health", 2, 0, 1, 0],
  [675, "Molina Healthcare", 2, 0, 1, 0],
  [1327, "Montana Health Cooperative", 2, 0, 1, 0],
  [1319, "Mountain Health Co-Op", 2, 0, 1, 0],
  [360, "Multiplan PHCS", 2, 0, 1, 0],
  [318, "Mutual of Omaha", 2, 0, 1, 0],
  [353, "MVP Health Care", 2, 0, 1, 0],
  [1475, "NALC Health Benefit Plan", 2, 0, 1, 0],
  [1428, "National Congress of Employers (NCE)", 2, 0, 1, 0],
  [547, "National Vision Administrators", 2, 0, 1, 0],
  [296, "Nationwide", 2, 0, 1, 0],
  [1451, "Navajo Nation", 2, 0, 1, 0],
  [617, "Neighborhood Health Plan (Massachusetts)", 2, 0, 1, 0],
  [1023, "Neighborhood Health Plan of Rhode Island", 2, 0, 1, 0],
  [1321, "Network Health Plan", 2, 0, 1, 0],
  [787, "Nevada Preferred", 2, 0, 1, 0],
  [1430, "New Directions Behavioral Health", 2, 0, 1, 0],
  [1267, "New Hampshire Healthy Families", 2, 0, 1, 0],
  [1119, "New Mexico Health Connections", 2, 0, 1, 0],
  [1372, "New York Hotel Trades Council", 2, 0, 1, 0],
  [1473, "NextLevelHealth", 2, 0, 1, 0],
  [782, "Nippon Life Benefits", 2, 0, 1, 0],
  [834, "North Carolina Health Choice (NCHC) for Children", 2, 0, 1, 0],
  [1138, "North Shore LIJ CareConnect", 2, 0, 1, 0],
  [597, "NovaNet", 2, 0, 1, 0],
  [502, "NY State No-Fault", 2, 0, 1, 0],
  [1309, "NY: YourCare Health Plan", 2, 0, 1, 0],
  [1432, "Ohara, LLC", 2, 0, 1, 0],
  [1365, "Ohio Health Choice", 2, 0, 1, 0],
  [927, "OHMS (Oregon Health Management Services)", 2, 0, 1, 0],
  [1476, "On Lok Lifeways", 2, 0, 1, 0],
  [367, "OneNet PPO", 2, 0, 1, 0],
  [783, "Opticare of Utah", 2, 0, 1, 0],
  [320, "Optima Health", 2, 0, 1, 0],
  [884, "Optimum HealthCare", 2, 0, 1, 0],
  [651, "Optum Health", 2, 0, 1, 0],
  [1127, "Oscar Health Insurance Co.", 2, 0, 1, 0],
  [1088, "OSU Health Plan", 2, 0, 1, 0],
  [1075, "Oxford (UnitedHealthcare)", 2, 0, 1, 0],
  [1481, "PA Medical Assistance", 2, 0, 1, 0],
  [1229, "Pacific Health Alliance", 2, 0, 1, 0],
  [697, "PacificSource Health Plans", 2, 0, 1, 0],
  [430, "Palmetto GBA", 2, 0, 1, 0],
  [1360, "Pan-American Life Insurance Group", 2, 0, 1, 0],
  [1092, "Paramount Healthcare", 2, 0, 1, 0],
  [514, "Parkland Community Health Plan", 2, 0, 1, 0],
  [1417, "Parkview Total Health", 2, 0, 1, 0],
  [1427, "Partners Health Plan", 2, 0, 1, 0],
  [951, "Partnership HealthPlan of California", 2, 0, 1, 0],
  [1174, "Passport Health Plan (Kentucky)", 2, 0, 1, 0],
  [1205, "Passport To Health (Montana Medicaid)", 2, 0, 1, 0],
  [1112, "Patient 1st (Alabama Medicaid)", 2, 0, 1, 0],
  [534, "PBA (Patrolmen's Benefit Association)", 2, 0, 1, 0],
  [599, "Peach State Health Plan", 2, 0, 1, 0],
  [571, "PeachCare for Kids", 2, 0, 1, 0],
  [1305, "PennCare", 2, 0, 1, 0],
  [1165, "Peoples Health", 2, 0, 1, 0],
  [582, "Phoenix Health Plan", 2, 0, 1, 0],
  [1191, "Physician Assured Access System", 2, 0, 1, 0],
  [1374, "Physician Benefits Trust", 2, 0, 1, 0],
  [1222, "Physicians Health Plan", 2, 0, 1, 0],
  [1148, "Physicians Health Plan of Northern Indiana, Inc.", 2, 0, 1, 0],
  [1167, "Physicians Plus Insurance Corporation", 2, 0, 1, 0],
  [1443, "PhysiciansCare", 2, 0, 1, 0],
  [1149, "Piedmont Community Health Plan", 2, 0, 1, 0],
  [1211, "Piedmont WellStar Health Plans", 2, 0, 1, 0],
  [344, "POMCO", 2, 0, 1, 0],
  [784, "Positive Health Care", 2, 0, 1, 0],
  [1347, "Preferential Care Network", 2, 0, 1, 0],
  [681, "Preferred Care Partners", 2, 0, 1, 0],
  [699, "PreferredOne", 2, 0, 1, 0],
  [601, "Premera Blue Cross", 2, 0, 1, 0],
  [1329, "Premier Health Plan", 2, 0, 1, 0],
  [604, "Presbyterian Health Plan/Presbyterian Insurance Company", 2, 0, 1, 0],
  [887, "Prestige Health Choice", 2, 0, 1, 0],
  [1203, "Primary Care Case Management (North Dakota Medicaid)", 2, 0, 1, 0],
  [748, "Prime Health Services, Inc", 2, 0, 1, 0],
  [1253, "PrimeWest Health", 2, 0, 1, 0],
  [321, "Principal Financial Group", 2, 0, 1, 0],
  [786, "Priority Health", 2, 0, 1, 0],
  [447, "Priority Partners", 2, 0, 1, 0],
  [867, "Progressive", 2, 0, 1, 0],
  [714, "Prominence Health Plan", 2, 0, 1, 0],
  [331, "Providence Health Plans", 2, 0, 1, 0],
  [979, "ProviDRs Care (WPPA)", 2, 0, 1, 0],
  [500, "Public Aid (Illinois Medicaid)", 2, 0, 1, 0],
  [1157, "Public Employees Health Program (PEHP)", 2, 0, 1, 0],
  [347, "QualCare", 2, 0, 1, 0],
  [1188, "QualChoice Arkansas", 2, 0, 1, 0],
  [912, "Quality Health Plans of New York", 2, 0, 1, 0],
  [602, "Regence Blue Cross Blue Shield", 2, 0, 1, 0],
  [1511, "Regent Insurance", 2, 0, 1, 0],
  [1510, "Republic-Franklin Insurance", 2, 0, 1, 0],
  [1357, "RiverLink Health", 2, 0, 1, 0],
  [1264, "Riverside Health", 2, 0, 1, 0],
  [1425, "RiverSpring Health", 2, 0, 1, 0],
  [1509, "RLI Indemnity Company", 2, 0, 1, 0],
  [695, "Rocky Mountain Health Plans", 2, 0, 1, 0],
  [468, "Sagamore Health Network", 2, 0, 1, 0],
  [918, "Samaritan Health Plan Operations", 2, 0, 1, 0],
  [1525, "SAMBA", 2, 0, 1, 0],
  [421, "San Francisco Health Plan", 2, 0, 1, 0],
  [1256, "Sanford Health Plan", 2, 0, 1, 0],
  [952, "Santa Clara Family Health Plan", 2, 0, 1, 0],
  [593, "SCAN Health Plan", 2, 0, 1, 0],
  [516, "Scott & White Health Plan", 2, 0, 1, 0],
  [1161, "Security Health Plan of Wisconsin, Inc.", 2, 0, 1, 0],
  [700, "Select Care", 2, 0, 1, 0],
  [469, "Select Health Network", 2, 0, 1, 0],
  [332, "SelectHealth", 2, 0, 1, 0],
  [800, "Sendero Health Plans", 2, 0, 1, 0],
  [1508, "Seneca Insurance", 2, 0, 1, 0],
  [1470, "Senior Dimensions", 2, 0, 1, 0],
  [629, "Senior Whole Health", 2, 0, 1, 0],
  [1507, "Sentry Insurance", 2, 0, 1, 0],
  [765, "Seton Health Plan", 2, 0, 1, 0],
  [953, "Sharp Health Plan", 2, 0, 1, 0],
  [755, "Sierra Health and Life", 2, 0, 1, 0],
  [801, "SightCare", 2, 0, 1, 0],
  [1147, "SIHO Insurance Services", 2, 0, 1, 0],
  [954, "SIMNSA Health Plan", 2, 0, 1, 0],
  [803, "Simply Healthcare", 2, 0, 1, 0],
  [1527, "Simpra Advantage", 2, 0, 1, 0],
  [971, "Solstice", 2, 0, 1, 0],
  [1103, "SoonerCare (Oklahoma Medicaid)", 2, 0, 1, 0],
  [1024, "Soundpath Health", 2, 0, 1, 0],
  [1252, "South Country Health Alliance", 2, 0, 1, 0],
  [767, "South Florida Community Care Network", 2, 0, 1, 0],
  [650, "Spectera", 2, 0, 1, 0],
  [1065, "SSM Health Care", 2, 0, 1, 0],
  [1022, "Standard Life and Accident Insurance Company", 2, 0, 1, 0],
  [1515, "Stanford Health Care Advantage", 2, 0, 1, 0],
  [1506, "StarNet Insurance", 2, 0, 1, 0],
  [297, "State Farm®", 2, 0, 1, 0],
  [1505, "State National Insurance", 2, 0, 1, 0],
  [1536, "Staywell Insurance", 2, 0, 1, 0],
  [1136, "Steward Health Care Network - Health Choice Arizona", 2, 0, 1, 0],
  [846, "Stratose", 2, 0, 1, 0],
  [334, "SummaCare", 2, 0, 1, 0],
  [1249, "Sunflower Health Plan", 2, 0, 1, 0],
  [769, "Sunshine Health", 2, 0, 1, 0],
  [517, "Superior HealthPlan", 2, 0, 1, 0],
  [553, "Superior Vision", 2, 0, 1, 0],
  [1504, "Sussex Insurance", 2, 0, 1, 0],
  [1542, "Sutter Health Plus", 2, 0, 1, 0],
  [554, "SutterSelect", 2, 0, 1, 0],
  [1440, "TakeCare", 2, 0, 1, 0],
  [1100, "Teachers Health Trust", 2, 0, 1, 0],
  [567, "TexanPlus", 2, 0, 1, 0],
  [518, "Texas Children's Health Plan", 2, 0, 1, 0],
  [1462, "Texas Health Aetna", 2, 0, 1, 0],
  [751, "Texas Kids First", 2, 0, 1, 0],
  [851, "Texas Women's Health Program", 2, 0, 1, 0],
  [483, "The Hartford", 2, 0, 1, 0],
  [1183, "The Health Plan of the Upper Ohio Valley, Inc.", 2, 0, 1, 0],
  [1270, "The HSC Health Care System", 2, 0, 1, 0],
  [1503, "TNUS Insurance", 2, 0, 1, 0],
  [842, "Total Health Care", 2, 0, 1, 0],
  [535, "Touchstone", 2, 0, 1, 0],
  [487, "Travelers", 2, 0, 1, 0],
  [377, "Tricare", 2, 0, 1, 0],
  [919, "Trillium Community Health Plan", 2, 0, 1, 0],
  [1293, "Trilogy Health Insurance", 2, 0, 1, 0],
  [1080, "Triple-S Salud: Blue Cross Blue Shield of Puerto Rico", 2, 0, 1, 0],
  [1526, "TrueHealth New Mexico", 2, 0, 1, 0],
  [1177, "Trusted Health Plan", 2, 0, 1, 0],
  [922, "Tuality Health Alliance", 2, 0, 1, 0],
  [1344, "Tufts Health Freedom Plan", 2, 0, 1, 0],
  [616, "Tufts Health Plan", 2, 0, 1, 0],
  [701, "UCare", 2, 0, 1, 0],
  [467, "UCHP (University of Chicago Health Plan)", 2, 0, 1, 0],
  [1178, "UHA Health Insurance", 2, 0, 1, 0],
  [1502, "ULLICO Casualty Company", 2, 0, 1, 0],
  [1457, "Ultimate Health Plans", 2, 0, 1, 0],
  [322, "UniCare", 2, 0, 1, 0],
  [623, "Uniform Medical Plan", 2, 0, 1, 0],
  [1465, "Union Eye Care", 2, 0, 1, 0],
  [475, "Union Health Services, Inc", 2, 0, 1, 0],
  [346, "Union Plans", 2, 0, 1, 0],
  [987, "United American", 2, 0, 1, 0],
  [449, "United Behavioral Health", 2, 0, 1, 0],
  [323, "UnitedHealthcare", 2, 0, 1, 0],
  [644, "UnitedHealthcare Community Plan", 2, 0, 1, 0],
  [330, "UnitedHealthcare Oxford", 2, 0, 1, 0],
  [995, "UnitedHealthOne", 2, 0, 1, 0],
  [1170, "Unity Health Insurance", 2, 0, 1, 0],
  [542, "Univera Healthcare", 2, 0, 1, 0],
  [531, "Universal American", 2, 0, 1, 0],
  [1501, "Universal Underwriters Insurance", 2, 0, 1, 0],
  [1287, "University Hospitals (Health Design Plus)", 2, 0, 1, 0],
  [1082, "University of Arizona Health Plans", 2, 0, 1, 0],
  [1448, "University of Maryland Health Advantage", 2, 0, 1, 0],
  [1564, "University of Maryland Health Partners", 2, 0, 1, 0],
  [1332, "University of Utah Health Plans", 2, 0, 1, 0],
  [1371, "University Physician Network (UPN)", 2, 0, 1, 0],
  [621, "UPMC Health Plan", 2, 0, 1, 0],
  [414, "US Family Health Plan", 2, 0, 1, 0],
  [974, "US Health Group", 2, 0, 1, 0],
  [384, "USA Managed Care Organization", 2, 0, 1, 0],
  [1331, "USAble Mutual Insurance Company", 2, 0, 1, 0],
  [1500, "Valley Forge Insurance", 2, 0, 1, 0],
  [861, "Valley Health Plan", 2, 0, 1, 0],
  [1166, "Vantage Health Plan, Inc.", 2, 0, 1, 0],
  [958, "Ventura County Health Care Plan", 2, 0, 1, 0],
  [1442, "Vibra Health Plan", 2, 0, 1, 0],
  [1098, "VillageCareMax", 2, 0, 1, 0],
  [1416, "Virginia Coordinated Care (VCC)", 2, 0, 1, 0],
  [479, "Virginia Health Network", 2, 0, 1, 0],
  [426, "Virginia Premier Health Plan", 2, 0, 1, 0],
  [548, "Vision Benefits of America", 2, 0, 1, 0],
  [778, "Vision Care Direct", 2, 0, 1, 0],
  [839, "Vision Plan of America", 2, 0, 1, 0],
  [1113, "Viva Health Plan", 2, 0, 1, 0],
  [1565, "Vivida Health", 2, 0, 1, 0],
  [416, "VNS Choice Health Plans", 2, 0, 1, 0],
  [857, "Volusia Health Network", 2, 0, 1, 0],
  [441, "VSP", 2, 0, 1, 0],
  [417, "Vytra", 2, 0, 1, 0],
  [1294, "WEA Trust", 2, 0, 1, 0],
  [1288, "Well Sense Health Plan", 2, 0, 1, 0],
  [418, "Wellcare", 2, 0, 1, 0],
  [856, "Wellmark Blue Cross Blue Shield", 2, 0, 1, 0],
  [1498, "West American Insurance", 2, 0, 1, 0],
  [1458, "West Virginia Senior Advantage", 2, 0, 1, 0],
  [422, "Western Health Advantage", 2, 0, 1, 0],
  [501, "Workers' Compensation", 2, 0, 1, 0],
  [1333, "WPS Health Plan", 2, 0, 1, 0],
  [1499, "WRM America Indemnity Company", 2, 0, 1, 0],
  [486, "Zenith", 2, 0, 1, 0]
];

let plans = [
  { response_type: 1, id: "2282", name: "Choice Fund PPO" },
  { response_type: 1, id: "2278", name: "HMO" },
  { response_type: 1, id: "2918", name: "Indemnity" },
  { response_type: 1, id: "2912", name: "Medicare Access" },
  { response_type: 1, id: "2279", name: "Open Access (all deductible levels)" },
  { response_type: 1, id: "2280", name: "Open Access Plus" },
  { response_type: 1, id: "2281", name: "Open Access Plus/CareLink" }
];

/*
Two requests would go hand in hand
1.https://www.zocdoc.com/api/1/carriers/1520/plans
2.https://www.zocdoc.com/api/1/carriers/1520/plans?tier=1
*/

let addCarriersToDatabase = () => {
  let planIds = [];
  console.log(carriers.length);
  carriers.map(carrier_el => {
    let firstRequest = `https://www.zocdoc.com/api/1/carriers/${
      carrier_el[0]
    }/plans`;

    request.get(firstRequest, function(err, resp, body) {
      if (resp.body) {
        let a = resp.body.substring(8);
        let plan = JSON.parse(a);
        if (plan.plans.length > 0) {
          plan.plans.map(plan => {
            // console.log({plan1: plan})
            // console.log({plan})
            let newPlan = new Plan({
              planId: plan.id,
              name: plan.name
            });
            // console.log({newPlan})
            planIds.push(newPlan._id);
            // console.log(newPlan)
            newPlan.save();
          });
        }
      }
      //Second request to zocDoc
      let secondRequest = `https://www.zocdoc.com/api/1/carriers/${
        carrier_el[0]
      }/plans?tier=1`;
      console.log({ secondRequest });
      request.get(secondRequest, function(err, res, body) {
        console.log(res.body);
        if (res.body) {
          let b = res.body.substring(8);
          let planb = JSON.parse(b);
          if (planb.plans.length > 0) {
            planb.plans.map(plan => {
              // console.log({plan})
              let newPlan = new Plan({
                planId: plan.id,
                name: plan.name
              });
              planIds.push(newPlan._id);
              // console.log({plab:newPlan})
              newPlan.save();
            });
          }
        }
        // console.log(planIds)
      });
      let carrier = new Carrier({
        carrierId: carrier_el[0],
        name: carrier_el[1],
        plans: planIds
      });
      carrier.save();
      // console.log({carrier})
      planIds = [];
    });
    // setTimeout(function(){

    //     // carrier.plans = planIds;
    //     //

    //  }, 10000);

    // firstRequest.get(`https://www.zocdoc.com/api/1/carriers/${carrier[0]}/plans`, function(response) {
    //     // Saving the response
    //     console.log(response)
    //     secondRequest.get(`https://www.zocdoc.com/api/1/carriers/${carrier[0]}/plans?tier=1`, function(response2) {
    //     // Saving the response
    //     console.log(response2)
    // });
    // });
  });
};

let allCarriers = (req, res) => {
  Carrier.find()
    .populate("plans")
    .then(carriers => {
      res.status(200).json({ status: true, carriers });
    })
    .catch(error => {
      res.status(400).json({ status: false, error });
    });
};

let deleteAll = () => {
  Plan.remove({});
  Carrier.remove({}).then(console.log("success"));
};

//Add more carriers through backend
let addCarriers = (req, res) => {
  let { name, plans, carrierId } = req.body;
  let planIds = [];

  //Saving multiple plans
  if (plans.lenth > 0) {
    plans.map(el => {
      let plan = new Plan({
        planId: el.id,
        name: el.name
      });
      planIds.push(plan._id);
      plan.save();
    });
  }

  //Saving the carriers
  let carrier = new Carrier({
    carrierId,
    name,
    plans: planIds
  });
  carrier
    .save()
    .then(data => {
      res.json({ status: true, data });
    })
    .catch(error => {
      res.json({ status: false, error });
    });
};

//Deleting a carrier from the backend
let deleteCarrier = (req, res) => {
  let { id } = req.body;
  Carrier.findByIdAndRemove(id)
    .then(data => {
      res.status({ status: true });
    })
    .catch(error => {
      res.status({ status: false });
    });
};

//Exporting all the functions
module.exports = {
  addCarriersToDatabase,
  deleteAll,
  allCarriers
};
