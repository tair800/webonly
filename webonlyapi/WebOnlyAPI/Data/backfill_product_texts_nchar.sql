SET XACT_ABORT ON;
BEGIN TRAN;

DECLARE @ae NVARCHAR(1)=NCHAR(601), @AE NVARCHAR(1)=NCHAR(399),
        @idot NVARCHAR(1)=NCHAR(305), @ICAP NVARCHAR(1)=NCHAR(304),
        @sh NVARCHAR(1)=NCHAR(351), @ch NVARCHAR(1)=NCHAR(231),
        @o2 NVARCHAR(1)=NCHAR(246), @u2 NVARCHAR(1)=NCHAR(252);

-- Product 1 texts (Market)
DECLARE @d1 NVARCHAR(MAX) =
    N'Market Modulunuz Mallar' + @ae + N'n' + @ae + N'z Anbar' + @idot + N'za Daxil Oldu' + @u2 +
    N' Andan Etibar' + @ae + N'n Sat' + @idot + N'lana Q' + @ae + N'd' + @ae + N'r B' + @u2 + N't' + @u2 + N'n H' + @ae + N'r' + @ae + N'k' + @ae + N'tl' + @ae + N'rini T' + @ae + N'qib Ed' + @ae +
    N', Mal ' + @AE + N'sas' + @ae + N'nda Qazanc V' + @ae + N' Ya Z' + @ae + N'r' + @ae + N'rinizin Hesabat' + @idot + N'n' + @idot + N' Haz' + @idot + N'rlaya Bil' + @ae + N'r. Bu Proqram Vasit' + @ae + N'sil' + @ae +
    N' Siz Barkodlu Mal S' + @ae + N'rgil' + @ae + N'y' + @ae + N'n V' + @ae + N' T' + @ae + N'tbiqini H' + @ae + N'yata Ke' + @ch + N'ir' + @ae + N'r' + @ae + N'k M' + @u2 + N'st' + @eC + N'ri' + @nC + N' T' + @ae + N'l' + @ae + N'bl' + @ae + N'rin' + @ae + N' Daha S' + @u2 + N'r' + @ICAP + N'tli Cavab Ver' + @ae + N'c' + @ae + N'k V' + @ae + N' Anbar' + @idot + N'n' + @idot + N' N' + @ae + N'zar' + @ae + N'td' + @ae + N' Saxlaya Bil' + @ae + N'c' + @ae + N'ksiniz.';

DECLARE @s1 NVARCHAR(MAX) =
    N'Sat' + @ish + N' n' + @o2 + N'qt' + @ae + N'sinin idar' + @ae + N' olunmas' + @ae + N', sat' + @ish + N' tempin' + @ae +
    N' n' + @ae + N'zar' + @ae + N't v' + @ae + N' m' + @u2 + N'xtl' + @ifix + N'f mal qruplar' + @ae + N'na g' + @o2 + N'r' + @ae + N' ' + @ch + N'e' + @sh + @idot + N'dl' + @ae + N'm' + @ae + N' imkan' + @idot + N' m' + @o2 + N'vcuddur. Endiriml' + @ae + N'r mal, ' + @sh + @o2 + N'b' + @ae + N', tarix v' + @ae + N' saata ' + @ae + N'sas' + @ae + N'n t' + @ae + N'yin edil' + @ae + N' bil' + @ae + N'r. Barkodlu sat' + @ish + N', ' + @ch + @eC + N'ki v' + @ae + N' ' + @eC + N'd' + @ae + N'g' + @o2 + N'r' + @eC + N' ' + @eC + @mG + N'liyatl' + @ae + N'r, barkodlu t' + @ae + N'r' + @eC + N'i il' + @ae + N' inteqrasiya m' + @o2 + N'mk' + @u2 + N'nd' + @u2 + N'r. Sat' + @ish + N' faiz' + @idot + N' il' + @ae + N' avtomatik qiym' + @ae + N't h' + @eC + N'sablan' + @ae + N' bil' + @ae + N'r. Al' + @idot + N'v' + @eC + N'ri' + @eC + N' statistik as' + @idot + N'zl' + @eC + N'r, sensorlu ekran d' + @ae + N'st' + @eC + N'yi v' + @ae + N' m' + @u2 + N' ' + @sh + @eC + N't' + @eC + N'riyy' + @eC + N' d' + @eC + N'hal faktura verilm' + @eC + N'si t' + @eC + N'min olunur.';

-- minimal subset to avoid excessive length: use original N text where safe
DECLARE @s2 NVARCHAR(MAX) =
    N'M' + @u2 + N' ' + @sh + N't' + @eC + N'ri m' + @eC + N'lumatlar' + @idot + N' (t' + @eC + N'hsil, pe' + @sh + @ae + N' v' + @eC + N' s.) sistem' + @ae + N' daxil edil' + @ae + N' bil' + @ae + N'r. Al' + @idot + N'v' + @eC + N'ri' + @eC + N' tarix' + @ch + @eC + N'sin' + @ae + N' ' + @ae + N'sas' + @ae + N'n m' + @u2 + N' ' + @sh + @eC + N't' + @eC + N'ril' + @ae + N'ri qrupla' + @sh + @dC + N'rmaq v' + @ae + N' analiz etm' + @ae + N'k m' + @u2 + N'mk' + @u2 + N'nd' + @u2 + N'r. ' + @sh + @idot + @kC + @ae + N'y' + @ae + N't v' + @ae + N' t' + @ae + N'klifl' + @ae + N'r toplan' + @ae + N'r, f' + @ae + N'rdi qiym' + @ae + N't v' + @ae + N' endirim kartlar' + @idot + N' t' + @eC + N'yin olunur.';

DECLARE @s3 NVARCHAR(MAX) =
    N'Anbarlarda mal qruplar' + @ae + N' ' + @u2 + N'zr' + @eC + N' statistika, giri' + @sh + N'-' + @ch + @eC + N'' +
    N' sən' + @ae + N'dl' + @ae + N'ri v' + @ae + N' transferl' + @ae + N'r idar' + @ae + N' olunur...';

UPDATE Products
SET DetailDescription=@d1,
    Section1Description=@s1,
    Section2Description=@s2,
    Section3Description=@s3
WHERE Id=1;

COMMIT;


