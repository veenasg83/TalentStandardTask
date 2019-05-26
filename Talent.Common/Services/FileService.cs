using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Talent.Common.Aws;
using Talent.Common.Contracts;

namespace Talent.Common.Services
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment _environment;
        private readonly string _tempFolder;
        private IAwsService _awsService;

        public FileService(IHostingEnvironment environment, 
            IAwsService awsService)
        {
            _environment = environment;
            _tempFolder = "images\\";
            _awsService = awsService;
        }

        public async Task<string> GetFileURL(string id, FileType type)
        {
            //Your code here;
            //throw new NotImplementedException();
            string fileURL = await Task.Run(() => string.Join("/", "http://localhost:60290/images", id));
            return fileURL;
        }

        public async Task<string> SaveFile(IFormFile file, FileType type)
        {
            var uniqueName = Convert.ToString(Guid.NewGuid());
            var extension = Path.GetExtension(file.FileName);
            var newFileName = uniqueName + extension;

            if (file.Length > 0)
            {
                var filePath = Path.Combine(_environment.ContentRootPath,"wwwroot", _tempFolder, newFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
            }
            return newFileName;
        }

        public async Task<bool> DeleteFile(string id, FileType type)
        {
            var imagesFolderPath = Path.Combine(_environment.ContentRootPath, _tempFolder);
            var filePath = Path.Combine(_tempFolder, id);

            if (File.Exists(filePath))
            {
                await Task.Run(() =>
                {
                    File.Delete(filePath);
                    return true;
                });
            }
            return false;
        }


        #region Document Save Methods

        private async Task<string> SaveFileGeneral(IFormFile file, string bucket, string folder, bool isPublic)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        
        private async Task<bool> DeleteFileGeneral(string id, string bucket)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        #endregion
    }
}
