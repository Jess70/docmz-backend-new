const { doc } = require('prettier');

const db = require('_helpers/db'),
	indexCpt = db.indexCpt,
	cpt = db.Cpt,
	express = require('express'),
	app = express(),
	request = require('request'),
	Procedure = db.Procedure,
	Specialty = db.Specialty,
	Practice = db.Practice;

let getProcedures = (req, res) => {
	Procedure.find()
		.then((data) => {
			res.status(200).json({ status: true, procedures: data });
		})
		.catch((error) => {
			res.status(404).json({ status: false, error });
		});
};

let addProcedures = () => {
	let procedures = [
		{ id: '1316', name: 'Pregnancy Follow Up', __typename: 'Procedure' },
		{ id: '4079', name: 'Laparoscopy', __typename: 'Procedure' },
		{
			id: '137',
			name: 'Prenatal Fetal Consultation',
			__typename: 'Procedure',
		},
		{ id: '4496', name: 'Chlamydia', __typename: 'Procedure' },
		{
			id: '1454',
			name: 'Recurrent Pregnancy Loss',
			__typename: 'Procedure',
		},
		{
			id: '4353',
			name: 'Uterine Fibroid Embolization (UFE)',
			__typename: 'Procedure',
		},
		{
			id: '3903',
			name: 'Minimally Invasive Hysterectomy',
			__typename: 'Procedure',
		},
		{ id: '3655', name: 'High Risk Pregnancy', __typename: 'Procedure' },
		{ id: '3334', name: 'Hysterectomy', __typename: 'Procedure' },
		{ id: '1597', name: 'Congenital Anomaly ', __typename: 'Procedure' },
		{ id: '4444', name: 'Galactorrhea', __typename: 'Procedure' },
		{ id: '3276', name: 'Prenatal Care', __typename: 'Procedure' },
		{ id: '2745', name: 'Cesarean Delivery', __typename: 'Procedure' },
		{
			id: '3904',
			name: 'Minimally Invasive Excision of Endometriosis',
			__typename: 'Procedure',
		},
		{ id: '1734', name: 'Gynecology Problem', __typename: 'Procedure' },
		{
			id: '129',
			name: 'Birth Control / Contraception',
			__typename: 'Procedure',
		},
		{ id: '3215', name: 'Pregnancy Cramp(s)', __typename: 'Procedure' },
		{
			id: '3349',
			name: 'Birth Defects / Congenital Malformations',
			__typename: 'Procedure',
		},
		{ id: '1795', name: 'Irregular Menstruation', __typename: 'Procedure' },
		{ id: '128', name: 'Pregnancy', __typename: 'Procedure' },
		{
			id: '497',
			name: 'Mammography - With Breast Cancer History',
			__typename: 'Procedure',
		},
		{ id: '3257', name: 'Pelvic Floor Disorders', __typename: 'Procedure' },
		{
			id: '1284',
			name: 'IVF / Reproductive Endocrinology',
			__typename: 'Procedure',
		},
		{ id: '3942', name: "Well Women's Exam", __typename: 'Procedure' },
		{
			id: '3449',
			name: 'Intrauterine Growth Restriction (IUGR)',
			__typename: 'Procedure',
		},
		{ id: '1193', name: 'Genetics Consultation', __typename: 'Procedure' },
		{ id: '4515', name: 'Adnexal Mass', __typename: 'Procedure' },
		{ id: '4503', name: 'Sonohysterogram', __typename: 'Procedure' },
		{
			id: '2447',
			name: 'Blood in Urine / Hematuria',
			__typename: 'Procedure',
		},
		{ id: '1367', name: 'Menopause Follow Up', __typename: 'Procedure' },
		{ id: '4514', name: 'Abortion Consultation', __typename: 'Procedure' },
		{ id: '3998', name: 'Pelvic Organ Prolapse', __typename: 'Procedure' },
		{ id: '2446', name: 'Anorgasmia', __typename: 'Procedure' },
		{ id: '3813', name: 'Periods', __typename: 'Procedure' },
		{ id: '384', name: 'Anemia', __typename: 'Procedure' },
		{
			id: '4513',
			name: 'Abnormal Uterine Bleeding',
			__typename: 'Procedure',
		},
		{ id: '127', name: 'OB-GYN Consultation', __typename: 'Procedure' },
		{ id: '1591', name: 'Colposcopy', __typename: 'Procedure' },
		{
			id: '130',
			name: 'Annual Pap Smear / GYN Exam',
			__typename: 'Procedure',
		},
		{ id: '149', name: 'Ultrasound', __typename: 'Procedure' },
		{ id: '1886', name: 'Nausea and Vomiting', __typename: 'Procedure' },
		{
			id: '1128',
			name: 'Premature Baby Consultation',
			__typename: 'Procedure',
		},
		{
			id: '252',
			name: 'Mammography - No Breast Cancer History',
			__typename: 'Procedure',
		},
		{ id: '1864', name: 'Miscarriage', __typename: 'Procedure' },
		{
			id: '2720',
			name: 'Hormone Replacement Therapy',
			__typename: 'Procedure',
		},
		{ id: '3344', name: 'Preterm Labor', __typename: 'Procedure' },
		{
			id: '3902',
			name: 'Minimally Invasive Gynecologic Surgery',
			__typename: 'Procedure',
		},
		{
			id: '1453',
			name: 'Polycystic Ovary Syndrome / Metabolic Syndrome',
			__typename: 'Procedure',
		},
		{ id: '3216', name: 'Menstrual Cramp(s)', __typename: 'Procedure' },
		{ id: '4517', name: 'Antepartum Care', __typename: 'Procedure' },
		{
			id: '4512',
			name: 'Abnormal Obstetrical Screening',
			__typename: 'Procedure',
		},
		{ id: '4495', name: 'Genital Herpes', __typename: 'Procedure' },
		{ id: '4222', name: 'Hormone Pellet Therapy', __typename: 'Procedure' },
		{ id: '1315', name: 'OB-GYN Follow Up', __typename: 'Procedure' },
		{
			id: '3017',
			name: 'Urinary Urgency / Urge Incontinence',
			__typename: 'Procedure',
		},
		{ id: '3441', name: 'Hormonal Imbalance', __typename: 'Procedure' },
		{ id: '482', name: 'Menopause Consultation', __typename: 'Procedure' },
		{ id: '1553', name: 'Vaginal Bleeding', __typename: 'Procedure' },
		{ id: '1813', name: 'Lactational Problems', __typename: 'Procedure' },
		{
			id: '2768',
			name: 'Shortness of Breath During Pregnancy',
			__typename: 'Procedure',
		},
		{ id: '2450', name: 'Spider Vein Treatment', __typename: 'Procedure' },
		{ id: '2744', name: 'Preeclampsia', __typename: 'Procedure' },
		{
			id: '3065',
			name: 'Overactive Bladder (OAB)',
			__typename: 'Procedure',
		},
		{ id: '4378', name: 'Contraception', __typename: 'Procedure' },
		{ id: '133', name: 'Osteoporosis Evaluation', __typename: 'Procedure' },
		{
			id: '2933',
			name: 'Sexual Dysfunction (Hormone Imbalance)',
			__typename: 'Procedure',
		},
		{
			id: '3795',
			name: 'Absence of Menstruation / Amenorrhea',
			__typename: 'Procedure',
		},
		{
			id: '3557',
			name: 'Fertility Awareness / Natural Family Planning',
			__typename: 'Procedure',
		},
		{ id: '3584', name: 'Pessary Fitting', __typename: 'Procedure' },
		{
			id: '4499',
			name: 'Human Papillomavirus (HPV) Vaccine',
			__typename: 'Procedure',
		},
		{ id: '4516', name: 'Advanced Maternal Age', __typename: 'Procedure' },
		{ id: '3335', name: 'Mastectomy', __typename: 'Procedure' },
		{
			id: '4053',
			name: 'Birth Control / Contraception Consultation',
			__typename: 'Procedure',
		},
		{
			id: '4006',
			name: 'Recurrent Urinary Tract Infections',
			__typename: 'Procedure',
		},
		{
			id: '481',
			name: 'Vaginal Discharge / Infection',
			__typename: 'Procedure',
		},
		{ id: '2548', name: 'Anal Warts / Condyloma', __typename: 'Procedure' },
		{ id: '3635', name: 'Uterine Fibroids', __typename: 'Procedure' },
		{
			id: '3760',
			name: 'Hyperprolactinemia / Elevated Prolactin Level',
			__typename: 'Procedure',
		},
		{
			id: '1690',
			name: 'Anticoagulation Management',
			__typename: 'Procedure',
		},
		{
			id: '2391',
			name: 'Pregnancy Nutrition Checkup',
			__typename: 'Procedure',
		},
		{ id: '2558', name: 'Breast Pain', __typename: 'Procedure' },
		{ id: '3911', name: 'Menstrual Migraine', __typename: 'Procedure' },
		{
			id: '1005',
			name: 'Urinary Tract Infection (UTI)',
			__typename: 'Procedure',
		},
		{
			id: '3905',
			name: 'Minimally Invasive Fibroid Removal',
			__typename: 'Procedure',
		},
		{ id: '2300', name: 'Pre / Post-Op Visit', __typename: 'Procedure' },
		{ id: '2746', name: 'Cervical Cerclage', __typename: 'Procedure' },
		{ id: '2522', name: 'Suture Removal', __typename: 'Procedure' },
		{ id: '3793', name: 'Hirsutism', __typename: 'Procedure' },
		{ id: '1131', name: 'Menstrual Problems', __typename: 'Procedure' },
		{
			id: '1572',
			name: 'Pre-conception Counseling',
			__typename: 'Procedure',
		},
		{
			id: '3848',
			name: 'Tubal Ligation Reversal',
			__typename: 'Procedure',
		},
		{
			id: '3011',
			name: 'Lysis of Labial Adhesions',
			__typename: 'Procedure',
		},
		{ id: '3041', name: 'Lump(s) in Breast', __typename: 'Procedure' },
		{
			id: '1501',
			name: 'Teen Unintended Pregnancy',
			__typename: 'Procedure',
		},
		{ id: '4103', name: 'Adenomyosis', __typename: 'Procedure' },
		{
			id: '3028',
			name: 'HIV Pre-Exposure Prophylaxis (PrEP)',
			__typename: 'Procedure',
		},
		{ id: '1854', name: 'Menopause', __typename: 'Procedure' },
		{
			id: '132',
			name: 'Sexual Dysfunction / Painful Sex / Dyspareunia',
			__typename: 'Procedure',
		},
		{
			id: '3299',
			name: 'Painful Urination / Dysuria',
			__typename: 'Procedure',
		},
		{ id: '3585', name: 'Pessary Follow Up', __typename: 'Procedure' },
		{ id: '4519', name: 'Anovulation', __typename: 'Procedure' },
		{
			id: '4567',
			name: 'Needle Suspension Surgery',
			__typename: 'Procedure',
		},
		{
			id: '4529',
			name: 'Cervical Insufficiency / Incompetence',
			__typename: 'Procedure',
		},
		{ id: '4586', name: 'Posterior Repair', __typename: 'Procedure' },
		{
			id: '4544',
			name: 'Human Papillomavirus (HPV)',
			__typename: 'Procedure',
		},
		{
			id: '4562',
			name: 'Maternal Substance Abuse',
			__typename: 'Procedure',
		},
		{ id: '4603', name: 'Uterine Anomaly', __typename: 'Procedure' },
		{ id: '4590', name: 'History of Stillbirth', __typename: 'Procedure' },
		{
			id: '4530',
			name: 'Cervical Intraepithelial Neoplasia (CIN)',
			__typename: 'Procedure',
		},
		{ id: '4550', name: 'Incomplete Abortion', __typename: 'Procedure' },
		{
			id: '4591',
			name: 'Prophylactic Oophorectomy',
			__typename: 'Procedure',
		},
		{
			id: '4572',
			name: 'Primary Ovarian Insufficiency (POI)',
			__typename: 'Procedure',
		},
		{ id: '4599', name: 'Threatened Abortion', __typename: 'Procedure' },
		{
			id: '4613',
			name: 'Vulvodynia / Vulvar Pain',
			__typename: 'Procedure',
		},
		{ id: '4528', name: 'Cervical Funneling', __typename: 'Procedure' },
		{ id: '4522', name: "Bartholin's Cyst", __typename: 'Procedure' },
		{ id: '4565', name: 'Missed Periods', __typename: 'Procedure' },
		{
			id: '4520',
			name: 'Asymptomatic Bacteriuria',
			__typename: 'Procedure',
		},
		{ id: '4571', name: 'Ovarian Cystectomy', __typename: 'Procedure' },
		{ id: '4557', name: 'Maternal Hypertension', __typename: 'Procedure' },
		{ id: '4612', name: 'Vulvar Disease', __typename: 'Procedure' },
		{ id: '4561', name: 'Maternal Seizures', __typename: 'Procedure' },
		{ id: '4521', name: 'Bacterial Vaginosis', __typename: 'Procedure' },
		{ id: '4574', name: "Vulvar Paget's Disease", __typename: 'Procedure' },
		{
			id: '4548',
			name: 'Hysteroscopic Adhesiolysis',
			__typename: 'Procedure',
		},
		{ id: '4551', name: 'Vaginal Laceration', __typename: 'Procedure' },
		{ id: '4593', name: 'Salpingo-Oophoritis', __typename: 'Procedure' },
		{
			id: '4542',
			name: 'History of Preterm Birth',
			__typename: 'Procedure',
		},
		{ id: '4545', name: 'Hydrosalpinx', __typename: 'Procedure' },
		{
			id: '4605',
			name: 'Vaginal / Vulvar Abscess',
			__typename: 'Procedure',
		},
		{
			id: '4596',
			name: 'Cervical Insufficiency / Short Cervix',
			__typename: 'Procedure',
		},
		{ id: '4587', name: 'Postpartum Care', __typename: 'Procedure' },
		{ id: '4577', name: 'Pelvic Abscess', __typename: 'Procedure' },
		{ id: '4543', name: 'Hot Flashes', __typename: 'Procedure' },
		{ id: '4604', name: 'Uterine Polyp', __typename: 'Procedure' },
		{ id: '4549', name: 'Myomectomy', __typename: 'Procedure' },
		{ id: '4554', name: 'Lichen Sclerosus', __typename: 'Procedure' },
		{ id: '4610', name: 'Vaginitis', __typename: 'Procedure' },
		{ id: '4569', name: 'Oligomenorrhea', __typename: 'Procedure' },
		{ id: '4575', name: 'Paratubal Cyst', __typename: 'Procedure' },
		{ id: '4558', name: 'Maternal Infection', __typename: 'Procedure' },
		{ id: '4579', name: 'Pelvic Mass', __typename: 'Procedure' },
		{ id: '4607', name: 'Vaginal Irritation', __typename: 'Procedure' },
		{
			id: '4546',
			name: 'Hyperemesis Gravidarum (HG)',
			__typename: 'Procedure',
		},
		{ id: '4570', name: 'Oophorectomy', __typename: 'Procedure' },
		{ id: '4573', name: 'Ovarian Torsion', __typename: 'Procedure' },
		{
			id: '4720',
			name: 'Fetal Anomalies / Abnormalities',
			__typename: 'Procedure',
		},
		{ id: '4566', name: 'Natural Birth', __typename: 'Procedure' },
		{
			id: '4615',
			name:
				'Atypical Glandular Cells of Undetermined Significance (AGUS)',
			__typename: 'Procedure',
		},
		{
			id: '4555',
			name: 'Maternal Collagen Vascular Disorder',
			__typename: 'Procedure',
		},
		{ id: '4547', name: 'Hydatiform Mole', __typename: 'Procedure' },
		{
			id: '4600',
			name: 'Tubo-Ovarian Abscesses (TOA)',
			__typename: 'Procedure',
		},
		{ id: '4568', name: 'Oligohydramnios', __typename: 'Procedure' },
		{
			id: '4536',
			name: 'Dilation And Curettage (D&C)',
			__typename: 'Procedure',
		},
		{ id: '4533', name: 'Cone Biopsy', __typename: 'Procedure' },
		{
			id: '4532',
			name: 'Cholestasis of Pregnancy (ICP)',
			__typename: 'Procedure',
		},
		{ id: '4614', name: 'Vulvovaginitis', __typename: 'Procedure' },
		{
			id: '4582',
			name: 'Perinatal Mental Health',
			__typename: 'Procedure',
		},
		{ id: '4541', name: 'HELLP Syndrome', __typename: 'Procedure' },
		{ id: '4611', name: 'Vasomotor Symptoms', __typename: 'Procedure' },
		{ id: '4576', name: 'Partial Hysterectomy', __typename: 'Procedure' },
		{ id: '4535', name: 'Dermoid Cyst', __typename: 'Procedure' },
		{ id: '4588', name: 'Postpartum Thyroiditis', __typename: 'Procedure' },
		{ id: '4592', name: 'Vaginal Tear', __typename: 'Procedure' },
		{
			id: '4539',
			name: 'First Trimester Screening',
			__typename: 'Procedure',
		},
		{ id: '4598', name: 'Ovarian Teratoma', __typename: 'Procedure' },
		{ id: '4583', name: 'Placenta Previa', __typename: 'Procedure' },
		{
			id: '4563',
			name: 'Maternal Thyroid Disorders',
			__typename: 'Procedure',
		},
		{ id: '4581', name: 'Perimenopause', __typename: 'Procedure' },
		{ id: '4585', name: 'Postcoital Bleeding', __typename: 'Procedure' },
		{ id: '4560', name: 'Maternal Obesity', __typename: 'Procedure' },
		{
			id: '4601',
			name: 'Twin-To-Twin Transfusion Syndrome (TTTS)',
			__typename: 'Procedure',
		},
		{
			id: '4606',
			name: 'Post-Hysterectomy Bleeding',
			__typename: 'Procedure',
		},
		{ id: '4518', name: 'Anterior Repair', __typename: 'Procedure' },
		{
			id: '4524',
			name: 'Bleeding During Intercourse',
			__typename: 'Procedure',
		},
		{ id: '4525', name: 'Breast Examination', __typename: 'Procedure' },
		{ id: '4564', name: 'Missed Abortion', __typename: 'Procedure' },
		{
			id: '4589',
			name: 'Premature Rupture of Membranes (PROM)',
			__typename: 'Procedure',
		},
		{
			id: '4538',
			name: 'Endometrial Hyperplasia',
			__typename: 'Procedure',
		},
		{
			id: '4559',
			name: 'Maternal Neurologic Disorders',
			__typename: 'Procedure',
		},
		{ id: '4556', name: 'Maternal Fibroids', __typename: 'Procedure' },
		{
			id: '4540',
			name: 'Gynecologic Disorders Of Athletes',
			__typename: 'Procedure',
		},
		{ id: '4527', name: 'Cervical Dysplasia', __typename: 'Procedure' },
		{ id: '4537', name: 'Ovarian Dysgerminomas', __typename: 'Procedure' },
		{ id: '4553', name: 'Salpingo-Oophorectomy', __typename: 'Procedure' },
		{ id: '4531', name: 'Cervicitis', __typename: 'Procedure' },
		{ id: '4584', name: 'Placental Abruption', __typename: 'Procedure' },
		{ id: '4526', name: 'Cervical Conization', __typename: 'Procedure' },
		{ id: '4523', name: 'Bladder Training', __typename: 'Procedure' },
		{ id: '4609', name: 'Vaginismus', __typename: 'Procedure' },
		{ id: '3234', name: 'Muscle Cramps', __typename: 'Procedure' },
		{
			id: '2805',
			name: 'Hip Replacement Surgery',
			__typename: 'Procedure',
		},
		{ id: '3829', name: 'Groin Injury', __typename: 'Procedure' },
		{
			id: '255',
			name: 'Bone Density Measurement / DXA Scan',
			__typename: 'Procedure',
		},
		{ id: '1078', name: 'Fracture', __typename: 'Procedure' },
		{ id: '109', name: 'Hand Problems', __typename: 'Procedure' },
		{ id: '3150', name: 'Cervical Myelopathy', __typename: 'Procedure' },
		{
			id: '3863',
			name: 'Anterior Cruciate Ligament (ACL) Injury',
			__typename: 'Procedure',
		},
		{ id: '1800', name: 'Joint Injection', __typename: 'Procedure' },
		{
			id: '1487',
			name: 'Sports Medicine Consultation',
			__typename: 'Procedure',
		},
		{
			id: '1212',
			name: 'Neck Deformation / Torticollis',
			__typename: 'Procedure',
		},
		{
			id: '2809',
			name: 'Hip and Knee Surgery Consultation',
			__typename: 'Procedure',
		},
		{ id: '2873', name: 'Dislocation', __typename: 'Procedure' },
		{
			id: '3428',
			name: 'Repetitive Motion Injury',
			__typename: 'Procedure',
		},
		{ id: '3850', name: 'Leg Fracture', __typename: 'Procedure' },
		{ id: '1623', name: 'Degenerative Disease', __typename: 'Procedure' },
		{ id: '190', name: 'Arthritis', __typename: 'Procedure' },
		{
			id: '360',
			name: 'Neck Surgery Consultation',
			__typename: 'Procedure',
		},
		{ id: '1736', name: 'Hammertoes ', __typename: 'Procedure' },
		{ id: '1328', name: 'Hand Surgery Follow Up', __typename: 'Procedure' },
		{
			id: '3969',
			name: 'Osteoarthritis (Foot and Ankle)',
			__typename: 'Procedure',
		},
		{ id: '1934', name: 'Orthopedic Trauma', __typename: 'Procedure' },
		{ id: '1801', name: 'Joint Problem ', __typename: 'Procedure' },
		{ id: '124', name: 'Knee Problems', __typename: 'Procedure' },
		{ id: '1245', name: 'Prosthesis', __typename: 'Procedure' },
		{
			id: '2810',
			name: 'Hip and Knee Surgery Follow Up',
			__typename: 'Procedure',
		},
		{ id: '161', name: 'Shoulder Problem', __typename: 'Procedure' },
		{ id: '3737', name: 'Cervical Radiculopathy', __typename: 'Procedure' },
		{
			id: '2872',
			name: 'Open Reduction and Internal Fixation Surgery',
			__typename: 'Procedure',
		},
		{
			id: '3897',
			name: 'Limb Lengthening and Realignment',
			__typename: 'Procedure',
		},
		{ id: '3464', name: 'Shoulder Dislocation', __typename: 'Procedure' },
		{ id: '422', name: 'Ankle Problems', __typename: 'Procedure' },
		{ id: '3837', name: 'Shin Splints', __typename: 'Procedure' },
		{
			id: '3222',
			name: 'Joint Inflammation / Septic Arthritis',
			__typename: 'Procedure',
		},
		{ id: '2705', name: 'Knee Pain', __typename: 'Procedure' },
		{
			id: '3943',
			name: 'Orthopedic Consultation (Foot and Ankle)',
			__typename: 'Procedure',
		},
		{
			id: '1937',
			name: 'Brittle Bones / Osteogenesis Imperfecta ',
			__typename: 'Procedure',
		},
		{ id: '1313', name: 'Orthopedic Follow Up', __typename: 'Procedure' },
		{ id: '1888', name: 'Neck Pain', __typename: 'Procedure' },
		{
			id: '2854',
			name: 'Anterior Cruciate Insufficiency',
			__typename: 'Procedure',
		},
		{
			id: '3421',
			name: 'Upper Extremity Dislocation',
			__typename: 'Procedure',
		},
		{
			id: '3098',
			name: 'Charcot-Marie-Tooth Disease',
			__typename: 'Procedure',
		},
		{ id: '1601', name: 'Contractures', __typename: 'Procedure' },
		{ id: '2862', name: 'Osteotomy', __typename: 'Procedure' },
		{
			id: '1214',
			name: 'Spine Deformation / Scoliosis ',
			__typename: 'Procedure',
		},
		{
			id: '2676',
			name: 'Ultrasound-Guided Joint Injections',
			__typename: 'Procedure',
		},
		{ id: '122', name: 'Back Problems', __typename: 'Procedure' },
		{ id: '2896', name: 'Amputation', __typename: 'Procedure' },
		{ id: '2901', name: 'Muscle Weakness', __typename: 'Procedure' },
		{ id: '3968', name: 'MRI - Foot and Ankle', __typename: 'Procedure' },
		{
			id: '3861',
			name: 'SLAP Tear / SLAP Lesion',
			__typename: 'Procedure',
		},
		{ id: '3359', name: 'Elbow Arthritis', __typename: 'Procedure' },
		{ id: '3820', name: 'Labral Tear', __typename: 'Procedure' },
		{ id: '251', name: 'X-ray', __typename: 'Procedure' },
		{ id: '421', name: 'Wrist Problems', __typename: 'Procedure' },
		{
			id: '3972',
			name: 'Independent Medical Exam (Orthopedic)',
			__typename: 'Procedure',
		},
		{
			id: '1211',
			name: 'Pediatric Orthopedics Consultation',
			__typename: 'Procedure',
		},
		{
			id: '3944',
			name: 'Orthopedic Follow Up (Foot and Ankle)',
			__typename: 'Procedure',
		},
		{
			id: '2861',
			name: 'Elbow Replacement Surgery',
			__typename: 'Procedure',
		},
		{
			id: '3967',
			name: 'Foot and Ankle Arthritis',
			__typename: 'Procedure',
		},
		{ id: '188', name: 'Bunion', __typename: 'Procedure' },
		{
			id: '2859',
			name: 'Total Shoulder Replacement',
			__typename: 'Procedure',
		},
		{ id: '3112', name: 'Lumbar Radiculopathy', __typename: 'Procedure' },
		{ id: '1213', name: 'Spondylolysis', __typename: 'Procedure' },
		{ id: '1204', name: 'Herniated Disk', __typename: 'Procedure' },
		{ id: '3643', name: 'Rotator Cuff Injury', __typename: 'Procedure' },
		{ id: '1483', name: 'Spinal Cord Tumor', __typename: 'Procedure' },
		{ id: '1292', name: 'Arthroscopy', __typename: 'Procedure' },
		{ id: '3243', name: 'Multiple Fractures', __typename: 'Procedure' },
		{ id: '106', name: 'Foot Problems', __typename: 'Procedure' },
		{ id: '3644', name: 'Running Injury', __typename: 'Procedure' },
		{ id: '2536', name: 'Spinal Decompression', __typename: 'Procedure' },
		{
			id: '3973',
			name: 'Orthopedic Consultation (Spine)',
			__typename: 'Procedure',
		},
		{ id: '1878', name: 'Musculoskeletal Tumor', __typename: 'Procedure' },
		{
			id: '2860',
			name: 'Cartilage Transplantation',
			__typename: 'Procedure',
		},
		{ id: '123', name: 'Sports Injury', __typename: 'Procedure' },
		{ id: '125', name: 'Hip Problems', __typename: 'Procedure' },
		{ id: '1061', name: 'Injury / Laceration', __typename: 'Procedure' },
		{ id: '1889', name: 'Neck Problems', __typename: 'Procedure' },
		{
			id: '3947',
			name: 'Orthopedic Follow Up (Hand)',
			__typename: 'Procedure',
		},
		{ id: '2802', name: "Marfan's Syndrome", __typename: 'Procedure' },
		{ id: '3642', name: 'Casting and Splinting', __typename: 'Procedure' },
		{ id: '3463', name: 'Shoulder Injury', __typename: 'Procedure' },
		{ id: '1242', name: 'Therapeutic Exercise', __typename: 'Procedure' },
		{
			id: '3948',
			name: 'Orthopedic Consultation (Hand)',
			__typename: 'Procedure',
		},
		{ id: '3935', name: 'Hand Arthritis', __typename: 'Procedure' },
		{ id: '1023', name: 'Joint Pain', __typename: 'Procedure' },
		{ id: '2374', name: 'Spina Bifida', __typename: 'Procedure' },
		{ id: '3862', name: 'Meniscus Tear', __typename: 'Procedure' },
		{
			id: '3971',
			name: 'Orthopedic Second Opinion',
			__typename: 'Procedure',
		},
		{ id: '1461', name: 'Spasticity', __typename: 'Procedure' },
		{ id: '429', name: 'Microsurgery', __typename: 'Procedure' },
		{ id: '3851', name: 'Hand Fracture', __typename: 'Procedure' },
		{
			id: '3974',
			name: 'Orthopedic Follow Up (Spine)',
			__typename: 'Procedure',
		},
		{ id: '1176', name: 'Muscle Strain', __typename: 'Procedure' },
		{ id: '104', name: 'Orthopedic Consultation', __typename: 'Procedure' },
		{ id: '187', name: 'Foot Pain', __typename: 'Procedure' },
		{ id: '2670', name: 'Broken Ribs', __typename: 'Procedure' },
		{ id: '1605', name: 'Corns / Calluses', __typename: 'Procedure' },
		{ id: '121', name: 'Elbow Problems', __typename: 'Procedure' },
		{
			id: '4071',
			name: 'Torn Tendons / Ligaments (Hand)',
			__typename: 'Procedure',
		},
		{
			id: '4627',
			name: 'Osteochondritis Dissecans (OCD)',
			__typename: 'Procedure',
		},
		{ id: '4257', name: 'Gluteal Strain', __typename: 'Procedure' },
		{
			id: '4632',
			name: 'Achilles Tendon Rupture',
			__typename: 'Procedure',
		},
		{ id: '4250', name: 'Spondylolisthesis', __typename: 'Procedure' },
		{ id: '4633', name: 'Throwing Injuries', __typename: 'Procedure' },
		{ id: '4282', name: 'Arthrodesis', __typename: 'Procedure' },
		{ id: '4859', name: 'Distal Bicep Injury', __typename: 'Procedure' },
		{ id: '4427', name: 'Tendinopathy', __typename: 'Procedure' },
		{
			id: '4741',
			name: 'Failed Back Surgery Syndrome (FBSS)',
			__typename: 'Procedure',
		},
		{ id: '4621', name: 'Bursitis', __typename: 'Procedure' },
		{ id: '4797', name: 'Ehlers-Danlos Syndrome', __typename: 'Procedure' },
		{
			id: '4799',
			name: 'Duchenne Muscular Dystrophy',
			__typename: 'Procedure',
		},
		{ id: '4251', name: 'Kyphosis', __typename: 'Procedure' },
		{ id: '4625', name: 'Leg Injuries', __typename: 'Procedure' },
		{ id: '4117', name: 'Infusion Therapy', __typename: 'Procedure' },
	];

	procedures.map((el) => {
		let procedure = new Procedure({
			procedure_id: el.id,
			name: el.name,
			__typename: el.__typename,
		});
		procedure.save();
	});
};

let addSpecialities = () => {
	let specialities = {
		popular_specialties: [
			{
				specialty_id: 153,
				specialty_name: 'Primary Care Doctor (PCP)',
				default_procedure_id: 75,
				default_procedure_name: 'Illness',
			},
			{
				specialty_id: 104,
				specialty_name: 'OB-GYN (Obstetrician-Gynecologist)',
				default_procedure_id: 130,
				default_procedure_name: 'Annual Pap Smear / GYN Exam',
			},
			{
				specialty_id: 101,
				specialty_name: 'Dermatologist',
				default_procedure_id: 84,
				default_procedure_name: 'Dermatology Consultation',
			},
			{
				specialty_id: 98,
				specialty_name: 'Dentist',
				default_procedure_id: 12,
				default_procedure_name: 'Dental Consultation',
			},
			{
				specialty_id: 130,
				specialty_name:
					'Ear, Nose & Throat Doctor (ENT / Otolaryngologist)',
				default_procedure_id: 110,
				default_procedure_name: 'ENT Consultation',
			},
			{
				specialty_id: 386,
				specialty_name: 'Eye Doctor',
				default_procedure_id: 92,
				default_procedure_name: 'General Eye Consultation',
			},
			{
				specialty_id: 122,
				specialty_name: 'Psychiatrist',
				default_procedure_id: 171,
				default_procedure_name: 'Psychiatry Consultation',
			},
			{
				specialty_id: 117,
				specialty_name: 'Orthopedic Surgeon (Orthopedist)',
				default_procedure_id: 104,
				default_procedure_name: 'Orthopedic Consultation',
			},
		],
		specialties: [
			{
				specialty_id: 345,
				specialty_name: 'Acupuncturist',
				default_procedure_id: 1296,
				default_procedure_name: 'Acupuncture',
			},
			{
				specialty_id: 132,
				specialty_name: 'Allergist (Immunologist)',
				default_procedure_id: 162,
				default_procedure_name: 'Allergy Consultation',
			},
			{
				specialty_id: 346,
				specialty_name: 'Audiologist',
				default_procedure_id: 114,
				default_procedure_name: 'Hearing Problems / Ringing in Ears',
			},
			{
				specialty_id: 105,
				specialty_name: 'Cardiologist (Heart Doctor)',
				default_procedure_id: 193,
				default_procedure_name: 'Cardiology Consultation ',
			},
			{
				specialty_id: 143,
				specialty_name: 'Cardiothoracic Surgeon',
				default_procedure_id: 2476,
				default_procedure_name: 'Cardiothoracic Surgery Consultation',
			},
			{
				specialty_id: 156,
				specialty_name: 'Chiropractor',
				default_procedure_id: 1165,
				default_procedure_name: 'Chiropractic Consultation',
			},
			{
				specialty_id: 133,
				specialty_name: 'Colorectal Surgeon',
				default_procedure_id: 1033,
				default_procedure_name: 'Colon Cancer Screening',
			},
			{
				specialty_id: 98,
				specialty_name: 'Dentist',
				default_procedure_id: 12,
				default_procedure_name: 'Dental Consultation',
			},
			{
				specialty_id: 101,
				specialty_name: 'Dermatologist',
				default_procedure_id: 84,
				default_procedure_name: 'Dermatology Consultation',
			},
			{
				specialty_id: 385,
				specialty_name: 'Dietitian / Nutritionist',
				default_procedure_id: 1060,
				default_procedure_name: 'Weight Loss Consultation',
			},
			{
				specialty_id: 130,
				specialty_name:
					'Ear, Nose & Throat Doctor (ENT / Otolaryngologist)',
				default_procedure_id: 110,
				default_procedure_name: 'ENT Consultation',
			},
			{
				specialty_id: 127,
				specialty_name: 'Endocrinologist (incl Diabetes Specialists)',
				default_procedure_id: 373,
				default_procedure_name: 'Endocrinology Consultation',
			},
			{
				specialty_id: 386,
				specialty_name: 'Eye Doctor',
				default_procedure_id: 92,
				default_procedure_name: 'General Eye Consultation',
			},
			{
				specialty_id: 106,
				specialty_name: 'Gastroenterologist',
				default_procedure_id: 386,
				default_procedure_name: 'Gastroenterology Consultation',
			},
			{
				specialty_id: 173,
				specialty_name: 'Geriatrician',
				default_procedure_id: 372,
				default_procedure_name: 'Senior Visit',
			},
			{
				specialty_id: 388,
				specialty_name: 'Hearing Specialist',
				default_procedure_id: 114,
				default_procedure_name: 'Hearing Problems / Ringing in Ears',
			},
			{
				specialty_id: 110,
				specialty_name: 'Hematologist (Blood Specialist)',
				default_procedure_id: 380,
				default_procedure_name: 'Hematology Consultation',
			},
			{
				specialty_id: 114,
				specialty_name: 'Infectious Disease Specialist',
				default_procedure_id: 371,
				default_procedure_name: 'Infection Consultation',
			},
			{
				specialty_id: 398,
				specialty_name: 'Infertility Specialist',
				default_procedure_id: 1784,
				default_procedure_name: 'Infertility Consultation',
			},
			{
				specialty_id: 362,
				specialty_name: 'Midwife',
				default_procedure_id: 128,
				default_procedure_name: 'Pregnancy',
			},
			{
				specialty_id: 373,
				specialty_name: 'Naturopathic Doctor',
				default_procedure_id: 75,
				default_procedure_name: 'Illness',
			},
			{
				specialty_id: 107,
				specialty_name: 'Nephrologist (Kidney Specialist)',
				default_procedure_id: 387,
				default_procedure_name: 'Nephrology Consultation',
			},
			{
				specialty_id: 128,
				specialty_name: 'Neurologist (incl Headache Specialists)',
				default_procedure_id: 225,
				default_procedure_name: 'Neurology Consultation',
			},
			{
				specialty_id: 113,
				specialty_name: 'Neurosurgeon',
				default_procedure_id: 418,
				default_procedure_name: 'Neurosurgery Consultation',
			},
			{
				specialty_id: 104,
				specialty_name: 'OB-GYN (Obstetrician-Gynecologist)',
				default_procedure_id: 130,
				default_procedure_name: 'Annual Pap Smear / GYN Exam',
			},
			{
				specialty_id: 111,
				specialty_name: 'Oncologist',
				default_procedure_id: 383,
				default_procedure_name: 'Oncology Consultation',
			},
			{
				specialty_id: 116,
				specialty_name: 'Ophthalmologist',
				default_procedure_id: 92,
				default_procedure_name: 'General Eye Consultation',
			},
			{
				specialty_id: 157,
				specialty_name: 'Optometrist',
				default_procedure_id: 98,
				default_procedure_name: 'Eyeglasses',
			},
			{
				specialty_id: 151,
				specialty_name: 'Oral Surgeon',
				default_procedure_id: 12,
				default_procedure_name: 'Dental Consultation',
			},
			{
				specialty_id: 135,
				specialty_name: 'Orthodontist',
				default_procedure_id: 151,
				default_procedure_name: 'Orthodontic Consultation',
			},
			{
				specialty_id: 117,
				specialty_name: 'Orthopedic Surgeon (Orthopedist)',
				default_procedure_id: 104,
				default_procedure_name: 'Orthopedic Consultation',
			},
			{
				specialty_id: 139,
				specialty_name: 'Pain Management Specialist',
				default_procedure_id: 535,
				default_procedure_name: 'Pain Management Consultation',
			},
			{
				specialty_id: 152,
				specialty_name: 'Pediatric Dentist',
				default_procedure_id: 1166,
				default_procedure_name: 'Pediatric Dentist Consultation',
			},
			{
				specialty_id: 100,
				specialty_name: 'Pediatrician',
				default_procedure_id: 136,
				default_procedure_name: 'Pediatric Consultation',
			},
			{
				specialty_id: 336,
				specialty_name: 'Physiatrist (Physical Medicine)',
				default_procedure_id: 1241,
				default_procedure_name:
					'Physical Medicine / Rehab Consultation',
			},
			{
				specialty_id: 335,
				specialty_name: 'Physical Therapist',
				default_procedure_id: 1261,
				default_procedure_name: 'Physical Therapy Consultation',
			},
			{
				specialty_id: 120,
				specialty_name: 'Plastic Surgeon',
				default_procedure_id: 349,
				default_procedure_name: 'Plastic Surgery Consultation',
			},
			{
				specialty_id: 121,
				specialty_name: 'Podiatrist (Foot and Ankle Specialist)',
				default_procedure_id: 184,
				default_procedure_name: 'Foot Consultation',
			},
			{
				specialty_id: 153,
				specialty_name: 'Primary Care Doctor (PCP)',
				default_procedure_id: 75,
				default_procedure_name: 'Illness',
			},
			{
				specialty_id: 137,
				specialty_name: 'Prosthodontist',
				default_procedure_id: 17,
				default_procedure_name: 'Bridge',
			},
			{
				specialty_id: 122,
				specialty_name: 'Psychiatrist',
				default_procedure_id: 171,
				default_procedure_name: 'Psychiatry Consultation',
			},
			{
				specialty_id: 337,
				specialty_name: 'Psychologist',
				default_procedure_id: 173,
				default_procedure_name: 'Psychotherapy',
			},
			{
				specialty_id: 108,
				specialty_name: 'Pulmonologist (Lung Doctor)',
				default_procedure_id: 209,
				default_procedure_name: 'Pulmonology Consultation',
			},
			{
				specialty_id: 123,
				specialty_name: 'Radiologist',
				default_procedure_id: 251,
				default_procedure_name: 'X-ray',
			},
			{
				specialty_id: 109,
				specialty_name: 'Rheumatologist',
				default_procedure_id: 190,
				default_procedure_name: 'Arthritis',
			},
			{
				specialty_id: 155,
				specialty_name: 'Sleep Medicine Specialist',
				default_procedure_id: 117,
				default_procedure_name: 'Sleep Problems',
			},
			{
				specialty_id: 129,
				specialty_name: 'Sports Medicine Specialist',
				default_procedure_id: 123,
				default_procedure_name: 'Sports Injury',
			},
			{
				specialty_id: 158,
				specialty_name: 'Surgeon',
				default_procedure_id: 432,
				default_procedure_name: 'Surgery Consultation',
			},
			{
				specialty_id: 387,
				specialty_name: 'Therapist / Counselor',
				default_procedure_id: 173,
				default_procedure_name: 'Psychotherapy',
			},
			{
				specialty_id: 382,
				specialty_name: 'Urgent Care Specialist',
				default_procedure_id: 1542,
				default_procedure_name: 'Urgent Care Consultation',
			},
			{
				specialty_id: 408,
				specialty_name: 'Urological Surgeon',
				default_procedure_id: 2480,
				default_procedure_name: 'Urological Surgery Consultation',
			},
			{
				specialty_id: 126,
				specialty_name: 'Urologist',
				default_procedure_id: 427,
				default_procedure_name: 'Urology Consultation',
			},
			{
				specialty_id: 142,
				specialty_name: 'Vascular Surgeon',
				default_procedure_id: 1110,
				default_procedure_name: 'Vascular Surgery ',
			},
		],
	};

	//Popular Specialities
	specialities.popular_specialties.map((el) => {
		let special = new Specialty({
			popular: true,
			speciality_id: el.specialty_id,
			name: el.specialty_name,
			procedure_name: el.default_procedure_name,
			default_procedure_id: el.default_procedure_id,
		});

		special
			.save()
			.then(console.log('Success'))
			.catch((error) => {
				if (error.code == 11000) {
					console.log({ special });
				}
			});
	});

	//Rest all specialties
	specialities.specialties.map((el) => {
		let special = new Specialty({
			speciality_id: el.specialty_id,
			name: el.specialty_name,
			procedure_name: el.default_procedure_name,
			default_procedure_id: el.default_procedure_id,
		});

		special
			.save()
			.then(console.log('Success'))
			.catch((error) => {
				if (error.code == 11000) {
					console.log({ special });
				}
			});
	});
};

let getSpecialty = (req, res) => {
	//  Specialty.remove({}).then(console.log("success"))
	Specialty.find({})
		.then((data) => res.json({ status: true, data }))
		.catch((error) => {
			res.status(404).json({ status: false, error });
		});
};

//Function to save a Doctor to the database
let addDoctor = () => {
	let doctor = new Doctor(req.body);
	doctor
		.save()
		.then((data) => {
			res.json({ status: true, data });
		})
		.catch((error) => {
			res.json({ status: false, error });
		});
};

const setDeviceToken = async (req, res) => {
	const { token, id } = req.body;
	try {
		const doctor = await Practise.findById(id, 'deviceToken');
		// //check for duplicate
		// const DT = doctor.deviceToken;
		// DT.push(token);
		doctor.deviceToken = [token];
		await doctor.save();
		console.log(doctor);
		res.json({ status: true });
	} catch (error) {
		res.json({ status: false, error });
	}
};
//Exporting all the functions
module.exports = {
	addProcedures,
	getProcedures,
	addSpecialities,
	getSpecialty,
	setDeviceToken,
};
