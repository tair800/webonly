-- Unicode-safe seed for Services and ServiceArticles using inline NCHAR codepoints (no variables)
BEGIN TRAN;

DELETE FROM ServiceArticles;
DELETE FROM Services;
DBCC CHECKIDENT ('Services', RESEED, 0);

SET IDENTITY_INSERT Services ON;

-- Helper notes (for readability only):
-- ə=NCHAR(601), ı=NCHAR(305), ğ=NCHAR(287), ç=NCHAR(231), ö=NCHAR(246), ü=NCHAR(252), Ə=NCHAR(399)

INSERT INTO Services (Id, Name, Subtitle, Icon, DetailImage, Description, Subtext, ImageUrl, CreatedAt) VALUES
(1,
 N'Bazan'+NCHAR(305)+N'n arxivl'+NCHAR(601)+N'nm'+NCHAR(601)+N'si',
 N'Arxivl'+NCHAR(601)+N'm'+NCHAR(601),
 N'/assets/service1.png', N'/assets/servicesDetail1.png',
 N'Arxivl'+NCHAR(601)+N'm'+NCHAR(601)+' prosesi t'+NCHAR(252)+'hluk'+NCHAR(601)+'sizliyi v'+NCHAR(601)+' davaml'+NCHAR(305)+'l'+NCHAR(305)+'n'+N' t'+NCHAR(601)+'min edir.',
 NULL, NULL, GETDATE()),
(2,
 N'Loglar'+NCHAR(305)+N'n saxlan'+NCHAR(305)+N'lmas'+NCHAR(305),
 N'Loglama',
 N'/assets/service2.png', N'/assets/servicesDetail2.png',
 N'Loglar v'+NCHAR(601)+' hadis'+NCHAR(601)+'l'+NCHAR(601)+'rin izl'+NCHAR(601)+'nm'+NCHAR(601)+'si.',
 NULL, NULL, GETDATE()),
(3,
 N'Hesabatlar'+NCHAR(305)+N'n e-po'+NCHAR(231)+N't g'+NCHAR(246)+N'nd'+NCHAR(601)+N'rilm'+NCHAR(601)+N'si',
 N'E-po'+NCHAR(231)+N't',
 N'/assets/service3.png', N'/assets/servicesDetail3.png',
 N'E-po'+NCHAR(231)+N'tla avtomatik g'+NCHAR(246)+N'nd'+NCHAR(601)+N'rilm'+NCHAR(601)+' t'+NCHAR(601)+'min olunur.',
 NULL, NULL, GETDATE()),
(4,
 N'Mobil hesabatlar',
 N'Mobil hesabatlar',
 N'/assets/service4.png', N'/assets/servicesDetail4.png',
 N'Mobil cihazlarla g'+NCHAR(246)+N'r'+NCHAR(252)+'nc'+NCHAR(252)+'l'+NCHAR(252)+'k.',
 NULL, NULL, GETDATE()),
(5,
 N'Bazan'+NCHAR(305)+N'n n'+NCHAR(252)+'sx'+NCHAR(601)+'sinin al'+NCHAR(305)+'nmas'+NCHAR(305),
 N'N'+NCHAR(252)+'sx'+NCHAR(601)+'l'+NCHAR(601)+'m'+NCHAR(601),
 N'/assets/service5.png', N'/assets/servicesDetail5.png',
 N'N'+NCHAR(252)+'sx'+NCHAR(601)+'l'+NCHAR(601)+'m'+NCHAR(601)+' m'+NCHAR(601)+'lumatlar'+NCHAR(305)+'n qorunmas'+NCHAR(305)+N'.',
 NULL, NULL, GETDATE()),
(6,
 N'Bonus modulunun t'+NCHAR(601)+'tbiqi',
 N'Bonus modulu',
 N'/assets/service6.png', N'/assets/servicesDetail6.png',
 N'Motivasiya v'+NCHAR(601)+' performans'+NCHAR(305)+'n art'+NCHAR(305)+'r'+NCHAR(305)+'lmas'+NCHAR(305)+N'.',
 NULL, NULL, GETDATE()),
(7,
 N'Hesabatlar'+NCHAR(305)+N'n haz'+NCHAR(305)+'rlanmas'+NCHAR(305),
 N'Hesabatlar',
 N'/assets/service7.png', N'/assets/servicesDetail7.png',
 N'Avtomatik hesabat t'+NCHAR(601)+'qdimat'+NCHAR(305)+N'.',
 NULL, NULL, GETDATE()),
(8,
 NCHAR(399)+N'm'+NCHAR(601)+'liyyat sisteminin yaz'+NCHAR(305)+'lmas'+NCHAR(305),
 NCHAR(399)+N'm'+NCHAR(601)+'liyyat sistemi',
 N'/assets/service8.png', N'/assets/servicesDetail8.png',
 N'Biznes prosesl'+NCHAR(601)+'rin idar'+NCHAR(601)+' edilm'+NCHAR(601)+'si.',
 NULL, NULL, GETDATE()),
(9,
 N'Sistemin audit olunmas'+NCHAR(305),
 N'Audit',
 N'/assets/service9.png', N'/assets/servicesDetail9.png',
 N'T'+NCHAR(252)+'hluk'+NCHAR(601)+'sizlik v'+NCHAR(601)+' performans auditi.',
 NULL, NULL, GETDATE());

SET IDENTITY_INSERT Services OFF;

INSERT INTO ServiceArticles (ServiceId, Number, Title, Description, OrderIndex, CreatedAt) VALUES
(2, N'01', N'Identify & Monitor Your Data',
    N'Bulud, mobil v'+NCHAR(601)+' lokal m'+NCHAR(252)+'hitl'+NCHAR(601)+'rd'+NCHAR(601)+' izl'+NCHAR(601)+'nm'+NCHAR(601)+' imkani.', 1, GETDATE()),
(2, N'02', N'Real-time Analytics',
    N'Real vaxt analitikasi v'+NCHAR(601)+' avtomatik hesabat.', 2, GETDATE()),
(2, N'03', N'Security Monitoring',
    N'T'+NCHAR(252)+'hluk'+NCHAR(601)+'sizlik hadis'+NCHAR(601)+'l'+NCHAR(601)+'rinin izl'+NCHAR(601)+'nm'+NCHAR(601)+'si.', 3, GETDATE());

COMMIT;

SELECT TOP 3 Id, Name, Subtitle FROM Services ORDER BY Id;
SELECT COUNT(*) AS HasSchwa FROM Services WHERE Name LIKE N'%' + NCHAR(601) + N'%';
