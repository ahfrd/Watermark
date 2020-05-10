<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
use setasign\Fpdi\Fpdi;
use setasign\Fpdi\PdfReader;
class Page extends CI_Controller
{
    // path
    private $image_path;
    private $root_uploads_path;
    private $merge_uploads_path;
    private $watermark_uploads_path;
    private $file_image;



    function __construct ()
    {
        parent::__construct();
        $this->load->library('session');

        $this->image_path = __DIR__ . '/../../images/';
        $this->root_uploads_path = __DIR__ . '/../../upload/';
        $this->merge_uploads_path = $this->root_uploads_path . 'merge/';
        $this->watermark_uploads_path = $this->root_uploads_path . 'watermark/';

        $this->file_image = 'Test.png';
    }


    function ViewDOC(){



      $image = $_SERVER['DOCUMENT_ROOT']  . "/images/MASTER.png";

    //$output = 'download';
    $output_file = $_SERVER['DOCUMENT_ROOT']  . "/upload/Test.pdf";

    $watermark_file = $_SERVER['DOCUMENT_ROOT'] . "/upload/Test2.pdf";

                $wpdf = new WatermarkPDF('image', $output_file, $image, -50, 90, 60);
                $wpdf->AddPage();

                  $wpdf->SetFont('Arial', '', 12);

                $wpdf->Output($watermark_file, 'I');


    //redirect($urls);

    }
}

/*
 * Try another watermarkpdf class
 */
class WatermarkPDF extends \setasign\Fpdi\Fpdi {
    public $_tplIdx;
    public $angle = 0;
    public $fullPathToFile;
    public $rotatedText = 'ahfrd';
    private $watermark = '';
    protected $type = 'image'; // 'image', 'text' in watermark
    protected $rotateAngle = 0;
    protected $left = 50;
    protected $right = 50;

    function __construct(
        $type,
        $fullPathToFile,
        $watermark,
        $rotateAngle = 0,
        $left = 50,
        $right = 250)
    {
        $this->fullPathToFile = $fullPathToFile;
        $this->watermark = $watermark;
        $this->type = $type;
        $this->rotateAngle = $rotateAngle;
        $this->left = $left;
        $this->right = $right;

        if ($watermark)
            $this->rotatedText = $watermark;

        parent::__construct();
    }

    function Rotate($angle, $x = -1, $y = -1)
    {
        if ($x == -1)
            $x = $this->x;
        if ($y == -1)
            $y = $this->y;
        if ($this->angle != 0)
            $this->_out('Q');

        $this->angle = $angle;
        if ($angle != 0) {
            $angle *= M_PI / 180;
            $c = cos($angle);
            $s = sin($angle);
            $cx = $x * $this->k;
            $cy = ($this->h - $y) * $this->k;

            $this->_out(sprintf('q %.5F %.5F %.5F %.5F %.2F %.2F cm 1 0 0 1 %.2F %.2F cm', $c, $s, -$s, $c, $cx, $cy, -$cx, -$cy));
        }
    }

    function _endpage ()
    {
        if ($this->angle != 0) {
            $this->angle = 0;
            $this->_out('Q');
        }

        parent::_endpage();
    }

    function Header ()
    {
        // Put the watermark
        if ($this->type == 'image') {
            // $this->Image('http://chart.googleapis.com/chart?cht=p3&chd=t:60,40&chs=250x100&chl=Hello|World', 40, 100, 100, 0, 'PNG');
            // $this->Image($this->watermark, 0, 100, 100, 0, 'PNG');
            $this->RotatedImage($this->left, $this->right, $this->watermark, $this->rotateAngle);
        } else {
            $this->SetFont('Arial', 'B', 50);
            $this->SetTextColor(255, 192, 203);
            $this->RotatedText($this->left, $this->right, $this->rotatedText, $this->rotateAngle);
        }

        if ($this->fullPathToFile) {
            if (is_null($this->_tplIdx)) {
                // THIS IS WHERE YOU GET THE NUMBER OF PAGES
                $this->numPages = $this->setSourceFile($this->fullPathToFile);

                for ($i = 1; $i <= $this->numPages; $i++) {
                    $this->_tplIdx = $this->importPage($i);

		    if ($i > 1)
                    	$this->AddPage();

		    $this->useTemplate($this->_tplIdx, 0, 0, 200);
                }
            }

            // if (is_null($this->_tplIdx)) {
            //     // THIS IS WHERE YOU GET THE NUMBER OF PAGES
            //     $this->numPages = $this->setSourceFile($this->fullPathToFile);
            //     $this->_tplIdx = $this->importPage(1);
            // }

            // $this->useTemplate($this->_tplIdx, 0, 0, 200);
        }
    }

    function RotatedImage ($x, $y, $image, $angle)
    {
        $this->Rotate($angle, $x, $y);
        $this->Image($image, $x, $y, 100, 0, 'PNG');
        $this->Rotate(0);
    }

    function RotatedText ($x, $y, $txt, $angle)
    {
        // Text rotated around its origin
        $this->Rotate($angle, $x, $y);
        $this->Text($x, $y, $txt);
        $this->Rotate(0);
    }
}
