package interview.controller;

import interview.resource.ZipUtility;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/file")

public class FileResource {

    Path source = Paths.get(this.getClass().getResource("/").getPath());
    Path newFolder = Paths.get(source.toAbsolutePath() + "/newFolder/");
    static int i=0;
    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files") List<MultipartFile> multipartFiles) throws IOException {

        try {
            if(!Files.exists(newFolder))
                Files.createDirectories(newFolder);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        List<String> filepaths = new ArrayList<>();
        List<String> filenames = new ArrayList<>();
        for (MultipartFile file : multipartFiles) {
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            Path newFile = Paths.get(newFolder.toAbsolutePath() + "/"+filename);
            if(!Files.exists(newFile))
                Files.createFile(newFile);
            file.transferTo(new File(newFile.toUri()));
            filepaths.add(newFile.toUri().getPath());

        }
        ZipUtility zipUtil = new ZipUtility();
        String zipFileName = "Files_"+ i+".zip";
        Path zipFile = Paths.get(newFolder.toAbsolutePath() + "/"+zipFileName);
        zipUtil.zip(filepaths.toArray(new String[0]), zipFile.toString());
        i++;
        filenames.add(zipFileName);
        return ResponseEntity.ok().body(filenames);
    }

    @GetMapping("/download/{filename}")
    public ResponseEntity<FileSystemResource> downloadFile(@PathVariable("filename") String filename) throws IOException {
        Path newFile = Paths.get(newFolder.toAbsolutePath() + "/"+filename);
        if (!Files.exists(newFile)) {
            throw new FileNotFoundException(filename + " was not found on the server");
        }
        return ResponseEntity.ok()
                .header("File-Name", filename)
                .header("Content-Disposition", "attachment; filename=" + filename)
                .body(new FileSystemResource(newFile));
    }

}
